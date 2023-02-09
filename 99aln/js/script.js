if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('./service-worker.js', {scope: './'}).then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

let audioSound = new Audio("aya.mp3");
// window.onload = function() {
//     document.getElementById("ayaSound").play();
// }





function ShowMenu() {
    audioSound.play();
    if (menu.style.display === "none") {
        menu.style.display = "block";
        document.getElementById("previousBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("pageBackgrnd").style.display = "none";
    } else {
        menu.style.display = "none";

    }
}
let sections = [
    "sec1", "sec2", "sec3", "sec4", "sec5", "sec6", "sec7", "sec8", "sec9", "sec10", "sec11", "sec12", "sec13", "sec14", "sec15",
    "sec16", "sec17", "sec18", "sec19", "sec20", "sec21", "sec22", "sec23", "sec24", "sec25", "sec26", "sec27", "sec28", "sec29",
    "sec30", "sec31", "sec32", "sec33", "sec34", "sec35", "sec36", "sec37", "sec38", "sec39", "sec40", "sec41", "sec42", "sec43",
    "sec44", "sec45", "sec46", "sec47", "sec48", "sec49", "sec50", "sec51", "sec52", "sec53", "sec54", "sec55", "sec56", "sec57",
    "sec58", "sec59", "sec60", "sec61", "sec62", "sec63", "sec64", "sec65", "sec66", "sec67", "sec68", "sec69", "sec70", "sec71",
    "sec72", "sec73", "sec74", "sec75", "sec76", "sec77", "sec78", "sec79", "sec80", "sec81", "sec82", "sec83", "sec84", "sec85",
    "sec86", "sec87", "sec88", "sec89", "sec90", "sec91", "sec92", "sec93", "sec94", "sec95", "sec96", "sec97", "sec98", "sec99"
];
let k;

function sartList() {
    if (document.getElementById(sections[97]).style.display === "block") {
        document.getElementById(sections[97]).style.display = "none";
        document.getElementById(sections[0]).style.display = "block";
    }
}

function endList() {
    if (document.getElementById(sections[0]).style.display === "block") {
        document.getElementById(sections[0]).style.display = "none";
        document.getElementById(sections[97]).style.display = "block";
    }
}

function nextPage() {
    k = 0;
    while (k < sections.length) {
        if (document.getElementById(sections[k]).style.display === "block") {
            document.getElementById(sections[k]).style.display = "none";
            document.getElementById(sections[k + 1]).style.display = "block";
            break;
        }
        k++;
        sartList();
    }
}

function previousPage() {
    k = 97;
    while (k > 0) {
        if (document.getElementById(sections[k]).style.display === "block") {
            document.getElementById(sections[k]).style.display = "none";
            document.getElementById(sections[k - 1]).style.display = "block";
            break;
        }
        k--;
        endList();
    }
}


function showContent(name) {

    audioSound.pause();



    let names = [
        "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10", "n11", "n12", "n13", "n14", "n15", "n16", "n17", "n18", "n19",
        "n20", "n21", "n22", "n23", "n24", "n25", "n26", "n27", "n28", "n29", "n30", "n31", "n32", "n33", "n34", "n35", "n36", "n37",
        "n38", "n39", "n40", "n41", "n42", "n43", "n44", "n45", "n46", "n47", "n48", "n49", "n50", "n51", "n52", "n53", "n54", "n55",
        "n56", "n57", "n58", "n59", "n60", "n61", "n62", "n63", "n64", "n65", "n66", "n67", "n68", "n69", "n70", "n71", "n72", "n73",
        "n74", "n75", "n76", "n77", "n78", "n79", "n80", "n81", "n82", "n83", "n84", "n85", "n86", "n87", "n88", "n89", "n90", "n91",
        "n92", "n93", "n94", "n95", "n96", "n97", "n98", "n99"
    ];
    let newSections = [...sections];
    let arr;
    let i;
    let j;
    console.log(newSections);
    nom = name.id;

    for (i = 0; i < names.length; i++) {
        if (nom === names[i]) {
            menu.style.display = "none";
            document.getElementById("previousBtn").style.display = "block";
            document.getElementById("nextBtn").style.display = "block";
            document.getElementById("pageBackgrnd").style.display = "block";
            // console.log(newSections[i]);
            // console.log(sections[i]);
            arr = newSections.splice(i, 1);
            // console.log(newSections);
            // console.log(arr);
            for (j = 0; j < newSections.length; j++) {
                document.getElementById(newSections[j]).style.display = "none";
            }
            document.getElementById(sections[i]).style.display = "block";
            break;
        }
    }
    if (document.getElementById(sections[98]).style.display === "block") {
        document.getElementById("previousBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
    }
}
