var metadata;
var translations = ["en.sahih.xml", "id.indonesian.xml"];
var tIndex = 0;
var currentSura = 1;

function changeLang(i) {
    tIndex = i;
    loadSuraButtons();
    load(currentSura, tIndex)
}

// https://stackoverflow.com/a/46247496/21407402
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function quranOnLoad() {
    var a = getUrlVars()["sura"];

    if (a) {
        load(a, tIndex);
    } else {
        load(1, tIndex)
    }

    loadSuraButtons();

    try {
        process.versions['electron'];

        var windowBtns = document.getElementsByClassName('window-button-container');

        for (var i = 0; i < windowBtns.length; i++) {
            windowBtns[i].style.display = 'grid';
        }

        document.getElementById('openquran-link').href = 'index.html'
        document.getElementById('openquran-home').href = 'index.html'
    } catch {
        var windowBtns = document.getElementsByClassName('window-button-container');

        for (var i = 0; i < windowBtns.length; i++) {
            windowBtns[i].style.display = 'none';
        }
    }
}

function load(suraIndex, translationIndex) {
    currentSura = suraIndex;
    loadMetadata(suraIndex - 1);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadSura(this, translationIndex, suraIndex);
        }
    };

    xhttp.open("GET", "./data/quran-uthmani.xml", true);
    xhttp.send();
}

function loadSura(xml, translationIndex, index) {
    var suraIndex = index - 1
    var sura, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    sura = xmlDoc.getElementsByTagName('sura');

    var children = sura[suraIndex].children;

    txt += "<ol>"
    for (var i = 0; i < children.length; i++) {
        txt += `<li class="sura-li">${children[i].getAttribute('text')}</li>
        <p id="t-${i}"></p>
        <hr>`;
    }
    txt += "</ol>"

    loadTranslation(index, translationIndex);

    document.getElementById("header").innerHTML = metadata[3] +
        " - <b>" + sura[suraIndex].getAttribute('name') + "</b>";
    document.getElementById("navbar-text").innerHTML = metadata[3] +
        " - <b>" + sura[suraIndex].getAttribute('name') + "</b>";
    document.getElementById("subheader").innerHTML = metadata[1] + " Aya <br>" + metadata[4];
    document.getElementById("main").innerHTML = txt;
}

function loadAllAya(xml) {
    var x, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    x = xmlDoc.getElementsByTagName('aya');

    txt += "<ol>"
    for (i = 0; i < x.length; i++) {
        txt += "<li>" + x[i].getAttribute('text') + "</li>";
    }
    txt += "</ol>"

    document.getElementById("main").innerHTML = txt;
}

function loadMetadata(suraIndex) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            metadata = getMetadata(this, suraIndex);
        }
    };

    xhttp.open("GET", "./data/quran-data.xml", true);
    xhttp.send();
}

function getMetadata(xml, suraIndex) {
    var sura, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    sura = xmlDoc.getElementsByTagName('sura');

    var index = sura[suraIndex].getAttribute('index');
    var ayas = sura[suraIndex].getAttribute('ayas');
    var name = sura[suraIndex].getAttribute('name');
    var tname = sura[suraIndex].getAttribute('tname');
    var type = sura[suraIndex].getAttribute('type');

    var metadata = new Array(5);
    metadata = [index, ayas, name, tname, type];

    return metadata;
}

function loadSuraButtons() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadMetadataButtons(this);
        }
    };

    xhttp.open("GET", "./data/quran-data.xml", true);
    xhttp.send();
}

function loadMetadataButtons(xml) {
    var sura, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    sura = xmlDoc.getElementsByTagName('sura');

    document.getElementById("sidebar-sura").innerHTML = "";
    for (var i = 0; i < sura.length; i++) {
        var index = sura[i].getAttribute('index');
        var tname = sura[i].getAttribute('tname');

        document.getElementById("sidebar-sura").innerHTML += `<a class="side-buttons" href="#" onclick="load(${index}, ${tIndex})"><i class="fa-solid fa-book-quran"></i> ${tname}</a>`;
    }
}

function loadTranslation(suraIndex, translationIndex, aya) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadTranslationAya(this, suraIndex, aya);
        }
    };

    xhttp.open("GET", `./data/${translations[translationIndex]}`, true);
    xhttp.send();
}

function loadTranslationAya(xml, index, aya) {
    var suraIndex = index - 1
    var sura, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    sura = xmlDoc.getElementsByTagName('sura');

    var children = sura[suraIndex].children;

    for (var i = 0; i < children.length; i++) {
        txt = children[i].getAttribute("text");
        document.getElementById(`t-${i}`).innerHTML = txt;
    }
}
