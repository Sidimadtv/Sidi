//Should fetch data from ThirdRock Radio
const third_rock_url = "https://feed.tunein.com/profiles/s151799/nowPlaying";

let origTitle = document.title;

const key = "title";
const upTime = 200000; //ms

let songs = [];
let artImg = [];
let timeStamp = [];
let tmpData;
let myList = [];
let upCount = 0;

var headers = {};
display_data();

setInterval(async function buildList(){
    /* Wait 'til display_data is finished, then get info from h2 elems */
    await display_data();
    const gotDiv = document.getElementById('nowPlaying');

    const song = gotDiv.getElementsByTagName("h2");
    const playTime = song[0].innerHTML.split(" ");
    
    //console.log("parent",song[1].innerHTML);
    var artwork = gotDiv.getElementsByTagName("div");
    artwork = artwork[0].innerHTML.split('"');

    //var thisSong = song[1].innerHTML; // .split("-");
    const divList = document.getElementById("playList");
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","row");
    //divList.setAttribute("class","row");
    var divColImg = document.createElement("div");
    divColImg.setAttribute("class","colImg");
    divColImg.innerHTML = "<img src='"+ artwork[1]+"' width='75'>";
    var divText = document.createElement("div");
    divText.setAttribute("class","colArtist");
    divText.innerHTML = "<span>" + song[1].innerHTML + "<br/>" + song[2].innerHTML +"</span>";
    var divTime = document.createElement("div");
    divTime.setAttribute("class","colTime");
    divTime.innerHTML = "<span>" + playTime[0] + "</span>";
    
    mainDiv.appendChild(divColImg);
    mainDiv.appendChild(divText);
    mainDiv.appendChild(divTime);

    divList.appendChild(mainDiv);
    document.body.appendChild(divList);

    timeStamp.push(playTime[0]);
    songs.push(song[1].innerHTML+"-"+song[2].innerHTML);
    artImg.push(artwork[1]);
    
    tmpData = {"time": timeStamp[upCount],"song":songs[upCount],"artwork":artImg[upCount]};
    myList.push(tmpData);
    console.log(upCount,myList);
    upCount++;
    //return divList;
},upTime);


async function display_data(){
    /* Display current song playing on ThirdRock */
    const gotData = await get_url(third_rock_url);
    var timeNow = new Date();
    let hh = timeNow.getHours();
    let mm = timeNow.getMinutes();

    if(mm < 10){
        mm = "0" + String(mm);
    }

    const img_art = "<img src='" + gotData.artwork + "' alt='Now Playing' width=350>";
    document.title = gotData.song;
    
    var myDiv = document.getElementById("nowPlaying");
    myDiv.style.width = "100%";
    myDiv.style.height = "450px";
    
    const h2Time = "<h2>"+ hh + ":" + mm +"</h2>"; 
    const hTitle = "<h1> Now Playing on ThirdRock Radio</h1>";
    const h2Song = gotData.song.split("-");
    const divTitle = "<div class='bottomText'>" + h2Time + 
    "<h2>"+ h2Song[0] + "</h2><h2>" + h2Song[1]+ "</h2></div>";
    const divImg = "<div class='contain'>" + img_art + divTitle + "</div>";
    const catInfo = divImg;
    myDiv.innerHTML = hTitle + catInfo;

    document.body.appendChild(myDiv);
}

async function get_url(my_url){
    const proxyUrl = "";//'https://cors-anywhere.herokuapp.com/';
    /* The above site is overloaded with requests, thus THIS might not work */
    var song;
    var artwork;

    try{
        const response = await fetch(proxyUrl + my_url)
        /*,{
        method: 'GET',
        mode: 'cors',
        //headers: {'Access-Control-Allow-Origin': '*'},
        //allowedHeaders: ['Content-Type', 'Authorization'],
        //Access-Control-Allow-origin: my_url
        });*/

        const data = await response.json();
        song = data['Header']['Subtitle'];
        artwork = data['Secondary']['Image'];
        //console.log(song,artwork);
    }catch(error){
        console.log("Error :(",error);
    } 

    return {song,artwork};
}

