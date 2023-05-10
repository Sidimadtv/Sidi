//Should fetch data from fm La Paz
//const third_rock = "https://feed.tunein.com/profiles/s151799/nowPlaying";
//const fmLaPaz = "https://stream.consultoradas.com/cp/get_info.php?p=8042";

var songs = [];
var artUrls = [];

document.addEventListener("load",buildList());

function buildList(){
    const gotDiv = document.getElementById('nowPlaying');
    //console.log(gotFrame);
    const song = gotDiv.getElementsByTagName("h2");

    const newDiv = document.createElement("div");
    newDiv.innerHTML = song[1].innerHTML;
    
    document.appendChild(newDiv);
    console.log("parent",song);
    //var divart = gotFrame.contentWindow.document.getElementsByTagName("DIV")[0];
    var artwork = "";//divart.getElementsByTagName("IMG")[0];
    //const gotData = await get_url(fmLaPaz);
    
    //song = getH2;
    //artwork = gotData.artwork;
    songs.push(song);
    artUrls.push(artwork);
    //var songArr = song.split("-");
    const divList = document.createElement("div");
    divList.setAttribute("class","row");
    var divColImg = document.createElement("div");
    divColImg.setAttribute("class","colImg");
    divColImg.innerHTML = "<img src='"+ artwork+"' width=100%>";
    var divText = document.createElement("div");
    divText.setAttribute("class","colTxt");
    divText.innerHTML = "<h3>" + song  + "</h3>";//"<p>"+songArr[1]+"</p>";
    divList.appendChild(divColImg);
    divList.appendChild(divText);
    console.log(songs,artUrls);
    document.body.appendChild(divList);
    //return divList;
}
