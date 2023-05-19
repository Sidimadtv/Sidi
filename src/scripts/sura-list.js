var metadata;

function load() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadMetadataButtons(this);
        }
    };

    xhttp.open("GET", "./data/quran-data.xml", true);
    xhttp.send();

    try {
        process.versions['electron'];

        var windowBtns = document.getElementsByClassName('window-button-container');
        
        for (var i = 0; i < windowBtns.length; i++) {
            windowBtns[i].style.display = 'grid';
        }

        document.getElementById('openquran-home').href = 'index.html'
    } catch {
        var windowBtns = document.getElementsByClassName('window-button-container');

        for (var i = 0; i < windowBtns.length; i++) {
            windowBtns[i].style.display = 'none';
        }
    }
}

function loadMetadataButtons(xml) {
    var sura, i, xmlDoc, txt;

    xmlDoc = xml.responseXML;
    txt = "";
    sura = xmlDoc.getElementsByTagName('sura');

    for (var i = 0; i < sura.length; i++) {
        var index = sura[i].getAttribute('index');
        var tname = sura[i].getAttribute('tname');

        try {
            process.versions['electron'];

            document.getElementById("sura-ul").innerHTML += `
                <li>
                    <table>
                        <tr>
                            <td class="number">${index}</td>
                            <td style="padding-left: 10px;"><a href="sura.html?sura=${index}" class="link">${tname}</a></td>
                        </tr>
                    </table>
                </li>`;
        } catch {
            document.getElementById("sura-ul").innerHTML += `
                <li>
                    <table>
                        <tr>
                            <td class="number">${index}</td>
                            <td style="padding-left: 10px;"><a href="sura?sura=${index}" class="link">${tname}</a></td>
                        </tr>
                    </table>
                </li>`;
        }
    }
}