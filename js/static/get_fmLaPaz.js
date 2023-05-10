/* 
Code to fetch id3 info from LaPaz.fm server.
Data are updated every 4mins or so and stored in a json-array
Playlist is built using this array.

Some icons are from: www.danklammer.com/bytesize-icons/
issues:
1. Since updating time is ~4mins but not all songs last that long,
json-array stores duplicated data.
2. It seems not easy to get info when audio is not playing,
after the user pushes play will either listen or not.
How to control this?
3. On mobile: after clicking show plalist button there's a possibility
that by accident update the page, in such case stream restarts, playlist
empties its contents to start all over again. Must find a way to prevent
this.
4. The audio stream has a lot of un-requested awful artwork, some of them
were avoided but remains a whole bunch. 

Soundcloud: Mobile settings
Song Title: font-size:22px;font-weight:700;
Song Artist: color: var(--second-color)
*/

const old_URL = "https://stream.consultoradas.com/cp/get_info.php?p=8042";
const thisURL = "https://cloudstream2030.conectarhosting.com/cp/get_info.php?p=8042";

//const these_days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//const animElem = '<div id="gifElm" class="equalizer no-audio"><div><span></span><span></span><span></span><span></span><span></span><span></span></div></div>';
//const opt_menu = '<svg id="i-options" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M28 6 L4 6 M28 16 L4 16 M28 26 L4 26 M24 3 L24 9 M8 13 L8 19 M20 23 L20 29" /></svg>'
const this_menu = '<svg id="i-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 8 L28 8 M4 16 L28 16 M4 24 L28 24" /></svg>'
const description = [": nonstop mixed music from the 70s, 80s and 90s.",
": lo mejor de los 70s, 80s y los 90s.",
": music from a generation that stand the test of time, the 70s and 80s.",
": con el mejor sonido y la emoción del escenario.",
": the best in ballads. A song can show what we feel."];

const weekly_9 = [
    // No PopArt on Monday @ 16
    {name:"DiscoStu",day:0,time:10,duration:3,desc:description[0]},
    {name:"UltraLight",day:0,time:16,duration:3,desc:description[4]},
    {name:"UltraLight",day:1,time:9,duration:3,desc:description[4]},
    {name:"PopArt",day:1,time:16,duration:1,desc:description[2]},
    {name:"UltraLight",day:2,time:10,duration:3,desc:description[4]},
    {name:"PopArt",day:2,time:16,duration:1,desc:description[2]},
    {name:"PopArt",day:3,time:10,duration:1,desc:description[2]},
    {name:"En Concierto",day:3,time:12,duration:1,desc:description[3]},
    {name:"Rock Clasico",day:3,time:16,duration:1,desc:description[1]},
    {name:"PopArt",day:4,time:10,duration:1,desc:description[2]},
    {name:"UltraLight",day:4,time:13,duration:3,desc:description[4]},
    {name:"En Concierto",day:4,time:16,duration:1,desc:description[3]},
    {name:"Rock Clasico",day:5,time:10,duration:1,desc:description[1]},    
    {name:"DiscoStu",day:6,time:10,duration:3,desc:description[0]},
];

const weekly_4 = [
    {name:"DiscoStu",day:0,time:10,duration:3,desc:description[0]},
    {name:"UltraLight",day:0,time:3,duration:3,desc:description[4]},
    {name:"UltraLight",day:0,time:20,duration:3,desc:description[4]},
    {name:"PopArt",day:1,time:3,duration:1,desc:description[2]},
    {name:"UltraLight",day:1,time:21,duration:3,desc:description[4]},
    {name:"PopArt",day:2,time:3,duration:1,desc:description[2]},
    {name:"PopArt",day:2,time:21,duration:1,desc:description[2]},
    {name:"En Concierto",day:2,time:23,duration:1,desc:description[3]},
    {name:"Rock Clasico",day:3,time:3,duration:1,desc:description[1]},
    {name:"PopArt",day:3,time:21,duration:1,desc:description[2]},
    {name:"UltraLight",day:4,time:0,duration:3,desc:description[4]},
    {name:"En Concierto",day:4,time:3,duration:1,desc:description[3]},
    {name:"Rock Clasico",day:4,time:21,duration:1,desc:description[1]},
    {name:"DiscoStu",day:5,time:21,duration:3,desc:description[0]},
    {name:"En Concierto",day:6,time:14,duration:1,desc:description[3]},
    {name:"DiscoStu",day:6,time:21,duration:3,desc:description[0]}
];

const titleErr = ["Radio Online  -  LAPAZ.FM"," - ","ID LAPAZ.FM 1  -  ID LAPAZ.FM 1",
"PROMO PUBLICIDAD LPFM - ","Diferente Como Tu Lapaz.fm  -  IVAN 5 *",
"La Radio Hecha A Tu Medida Lapaz.fm  -  IVAN 7 *","ID LAPAZ.FM 0 - ID LAPAZ.FM 0",
"CS LAPAZFM - Losing My Religion", "DESPEDID - ROCK CLAS"];
const awfulArt = ["https://stream.consultoradas.com/cp/musiclibrary/nowplay_fmlapaz.png",
"https://i.scdn.co/image/ab67616d0000b273852527d582b377f1543129a3",
"https://i.scdn.co/image/ab67616d0000b2737515ba4e369a9526d7d4dfde",
"https://i.scdn.co/image/ab67616d0000b27344789c72043033cd97924059",
"https://stream.consultoradas.com/cp/musiclibrary/nocover.png",
"https://i.scdn.co/image/ab67616d0000b273946c1699a48b214e45f765d6",
"https://i.scdn.co/image/ab67616d0000b2736d7a8a34f348d587f007045f",
"https://i.scdn.co/image/ab67616d0000b273d4af276af7f96299274d4b1b",
"https://i.scdn.co/image/ab67616d0000b273e8e71ebc372dfa978fc0581f"];

const keys = ["title","art","bitrate","listeners"];
let upTime = 220000;//3600000;~on Sat/Sun 10~13// about 3min20s
const errLapse = 20000; //20s

let songs = [];
let artImg = [];
let timeStamp = [];
let tmpData;
let myList = [];
let upCount = 0;

display_data();

if(navigator.userAgent.match(/(iPhone|iPad|Android|IEMobile)/)){
    // Load onMobile only:console.log("User is using a Mobile device");
    window.onscroll = function() {scrollFunction();};
    //document.getElementById("playList").style.display = "none";
}
/*else{//TypeError: playList is null
    document.getElementById("playList").style.display = "block";}*/

const pxx=350;
//scrolldelay = setTimeout('scrollFunction()',500); // scrolls every 500 milliseconds
function scrollFunction() {
    const plist = document.getElementById("playList");
    if (plist.scrollTop > pxx) {
        document.getElementById("topBtn").style.display = "block";
        document.getElementById("currSong").style.display = "block";
        document.getElementById("headTit").style.display = "none";
    } else {
        document.getElementById("topBtn").style.display = "none";
        document.getElementById("currSong").style.display = "none";
        document.getElementById("headTit").style.display = "block";
    }
}

function topFunction() {
    console.log("user clicks on myBtn, scroll to top");
    //document.body.scrollTop = 0;//document.body.animate({scrollTop:0},1500);
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

function reloadMe(){
    /* Reload the Playing artwork */
    console.log("Reloading artwork...");
    // window.scroll({bottom:0,left:0,behavior:'smooth'});
    // scrollTo(0, document.body.scrollHeight); // set cursor to top
    display_data();
}

function zeroPad(timeElm){
    return (parseInt(timeElm,10) < 10 ? '0' : '') + timeElm;
}
function clear_nowPlay(){
    const nowText = document.getElementById("now_text");
    const headTitle = document.getElementById("nowLabel");
    const imgArt = document.getElementById("album_art");
    const nowSong = document.getElementById("now_song");
    if(imgArt !== null){imgArt.innerHTML = "";}
    if(nowText !== null){nowText.innerHTML = "";}
    nowSong.innerHTML = "";
    document.title = "Updating...";
    headTitle.innerHTML = "<h2>Retrieving data, please wait&emsp;&emsp;"+
    "<img src='assets/tail-spin.svg'/></h2>";
}
function sleepy(msec){
    /* Display a simple msg on top */
    clear_nowPlay();
    return new Promise(resolve =>setTimeout(resolve,msec));
}

function get_sched(tag,heure,time_lag){
    let myTitle = "Now on LaPaz.fm ♪ Adult contemporary music.";
    let gotObj = weekly_9; //default JST
    if(time_lag == 240){
        gotObj = weekly_4;// UTC-4
    }
    for (let item in gotObj){
        if(gotObj[item].day === tag){
            let endTime = gotObj[item].time + gotObj[item].duration;
            if(heure >= gotObj[item].time && heure < endTime){
                myTitle = "Now on LaPaz.fm ♪ " + gotObj[item].time + ":00 ~ " + 
                endTime + ":00 <em>" + gotObj[item].name +"</em>"+gotObj[item].desc;
            }
        }
    }
    return myTitle;
}

function build_schedule(tag,heure,time_lag){
    let sched = [];
    let outStr = "";
    let thisObj = weekly_9;
    if(time_lag == 240){thisObj = weekly_4;}
    for(let item in thisObj){
        if(thisObj[item].day === tag){
            if(thisObj[item].time > heure){
                sched.push(thisObj[item].time);
                sched.push(thisObj[item].name);
                outStr = " Later today at " + sched[0] + ":00 " + sched[1];
            }
        }
    }
    return outStr;
}

function export_to_file(jsonData){
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+encodeURIComponent(dataStr);
    let exportFile = "playlist.json";

    let linkElm = document.getElementById("downLink")
    linkElm.setAttribute('href',dataUri);
    linkElm.setAttribute('download',exportFile);
    //linkElm.click();//downloads a file every update
}

setInterval(async function makePlayList(){
    /* Build a playlist from myList: array data */
    await display_data();//builds myList
    const parentDiv = document.getElementById("music");
    const divList = document.getElementById("playList");
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","row");
    const divText = document.createElement("div");
    divText.setAttribute("class","colArtist float_left");
    //last prev index of myList array, last will be -1
    const lena = Object.keys(myList)[Object.keys(myList).length - 2];
    let gotArtist = myList[lena].song.split("-");
    if(titleErr.includes(gotArtist)){
        gotArtist[0] = "CM or Station Id";
        myList[lena].artwork = "assets/cd-case.svg";
    }
    let gotArtwork = myList[lena].artwork;
    if(awfulArt.includes(gotArtwork)){
        gotArtwork = "assets/cd-case.svg";
        gotArtist = ["Sorry, artwork not found in DB",""];
    }
    const divColImg = document.createElement("div");
    divColImg.setAttribute("class","colImg float_left");
    /*divColImg.style.backgroundImage = "url('"+ gotArtwork + "')";
    divColImg.style.backgroundSize = "75px";
    divColImg.style.backgroundRepeat = "no-repeat";*/
    divColImg.innerHTML = "<img src='"+ gotArtwork + "' width='75' height='75'/>";
    divText.innerHTML = "<span>" + gotArtist[0] + "</span><span>" + gotArtist[1] +"</span>";

    const divTime = document.createElement("div");
    divTime.setAttribute("class","colTime float_left");
    divTime.innerHTML = "<span>" + myList[lena].time + "</span>";
    
    mainDiv.appendChild(divColImg);
    mainDiv.appendChild(divText);
    mainDiv.appendChild(divTime);

    divList.appendChild(mainDiv);
    parentDiv.appendChild(divList);
},upTime);

async function display_data(){
    /* Display current song playing on FM La Paz 
    Builds array to store recently played*/
    let gotData = await get_url(thisURL);
    const parentDiv = document.getElementById("music");
    const timeNow = new Date();
    const timeOffset = timeNow.getTimezoneOffset(); //if UTC + -> return -offset
    //console.log(timeOffset,typeof(timeOffset));
    let day = timeNow.getDay();
    let hh = timeNow.getHours();
    let mm = zeroPad(timeNow.getMinutes()); //(mm < 10)? "0" + String(mm):mm;
    let ss = zeroPad(timeNow.getSeconds()); //(ss < 10)? "0" + String(ss):ss;

    let gina = hh + ":" + mm + ":" + ss;
    // console.log("time",gina);
    if(titleErr.includes(gotData.song)){
        console.log(gina,"error:",gotData.song);
        await sleepy(errLapse);
        gotData = await get_url(thisURL);
        console.log("gotIt:",gotData.song);
    }
    if(gotData.song === " - "){
        gotData.song = "LaPaz.fm - Song ID not found on DB"
    }

    if(awfulArt.includes(gotData.artwork)){
        console.log(gina,"wait 40s, art error:",gotData.artwork);
        await sleepy(40000);//40s
        gotData = await get_url(thisURL);
    }
    
    if(awfulArt.includes(gotData.artwork)){
        gotData.artwork = "assets/discoStu.png";
    }
    
    document.title = gotData.song;
    
    const img_art = "<img src='" + gotData.artwork + "' alt='Artwork' width='256' height='256'>";
    const titleStatus = document.getElementById("title_stat");
    titleStatus.innerHTML = get_sched(day,hh,timeOffset) + build_schedule(day,hh,timeOffset);
    const headTitle = document.getElementById("nowLabel");
    headTitle.innerHTML = "<h2 id='mainTitle' class='col90 float_left'>You are listening to:</h2>" +
    "<h2 id='currSong' class='col90 float_left'>Now: " + gotData.song + "</h2>" + 
    "<h2 id='listIcon' onclick='openNav()' class='col10 float_left closeBtn'>" + this_menu + "</h2>";
    //<img src='assets/list-alt.svg' width='32'/>"<h2 class='col90 float_left' id='headTit'>" + "</h2>" + 

    const myDiv = document.getElementById("nowPlaying");
    /*myDiv.style.width = "100%"; myDiv.style.height = "350px";*/
    //let gina = hh + ":" + mm + ":" + ss;
    const h2Time = "<h2 class='lighter col_50 float_left'><small>&#8986; "+ gina +
    "</small></h2><button title='reload id3-tag' onclick='reloadMe()'>" + 
    "<img src='assets/reload-svgrepo.svg' width='32'/></button>";
    //document.createElement("h2");
    //const hTitle = "<h1> Now Playing: " + get_sched(day,hh) + "</h1>";
    const h2Song = gotData.song.split("-");
    if (h2Song.length < 2){
        h2Song.push("No title");
    }
    const divTitle = "<div id='now_text' class='bottomText'>" + "<h2 class='headLabel'>"+ h2Song[0].trim() +
    "</h2><h2><small>" + h2Song[1].trim() + 
    "</small></h2>"+ h2Time +"<div id='more_info'><div class='col3 float_left'>"+
    "<h3 class='lighter'>Bitrate</h3><h3>" + gotData.bit + 
    " kbps</h3></div><div class='col3 float_left'><h3 class='lighter'> Listeners</h3><h3>"+ 
    gotData.listen + "</h3></div><div class='col3 float_left'><h3 class='lighter'>More info</h3>" + 
    "<h3><a href='https://duckduckgo.com/?q="+ h2Song[1].trim().replace(/\s+/g,"%20")+ "+" + 
    h2Song[0].trim().replace(/\s+/g,"%20").replace(/'/g,"") +
    "&t=ffcm&atb=v319-1&ia=web' target='_blank'><img src='assets/duck.svg' width=32/></a>"+
    "</h3></div>" + "<div class='no_mobil'>Press <kbd>d</kbd> key to START stream, <kbd>s</kbd> key to STOP stream</div></div></div>";

    const divImg = "<div class='bkg_cd_icon contain' id='album_art'><div class='cover'><div>" + img_art +
    "</div></div></div>" + divTitle;
    //console.log("doc",divElm);//const catInfo = divImg;
    myDiv.innerHTML = divImg; /*hTitle +catInfo;*/ 
    //document.body.appendChild(myDiv);
    parentDiv.appendChild(myDiv);

    // I wonder if it's necessary to display currSong a 2nd time
    const now_song = document.getElementById("now_song");
    //now_song.innerHTML = "&emsp;"+ gotData.song;
    now_song.innerHTML = h2Song[0].trim() + "<br/>"+ h2Song[1].trim();

    // Saving data into array
    let noSec = gina;//time HH:MM:SS
    noSec = (noSec.length < 8)? noSec.substring(0,4):noSec.substring(0,5);
    /*if(upCount === 0){
        tmpData = {"time":noSec,"song":gotData.song,"artwork":gotData.artwork};}
    else{if(songs[upCount] !== songs[upCount-1]){}}*/
    timeStamp.push(noSec);
    songs.push(gotData.song);
    artImg.push(gotData.artwork);
    tmpData = {"time": timeStamp[upCount], "song": songs[upCount], "artwork": artImg[upCount]};
    myList.push(tmpData);
    //console.log(upCount,myList);
    export_to_file(myList);
    const dLink = document.getElementById("downLink");
    dLink.innerHTML = "<img src='assets/down_cloud.svg' width='32'/>";
    upCount++;
}

async function get_url(my_url){
    try {
        const response = await fetch(my_url);
        const data = await response.json();
        const song = data[keys[0]];
        const artwork = data[keys[1]];
        const bit = data[keys[2]];
        const listen = data[keys[3]];
        return {song,artwork,bit,listen};
    } catch (error) {
        alert("Sorry, could not connect to lapaz.fm server, please wait.",error);
    }    
}

/* open and close Info modal */
function openNav(){
    document.getElementById("currSong").style.display = "block";
    document.getElementById("mainTitle").style.display = "none";
    document.getElementById("nowPlaying").style.display = "none";
    document.getElementById("playList").style.display = "block";
    document.getElementById("player").style.display = "none";
    document.getElementById("station_info").style.display = "none";

    const closeBtn = document.getElementById("listIcon");
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="#2e4054" stroke="#bed2e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M2 30 L30 2 M30 30 L2 2"/></svg>';
    //'<svg id="i-arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 6 L2 16 10 26 M2 16 L30 16" /></svg>';
    //'<svg id="i-chevron-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M20 30 L8 16 20 2" /></svg>';
    
    //closeBtn.style.margin = "0";
    //closeBtn.setAttribute("class","col10 float_left closeBtn");
    //closeBtn.setAttribute("href","javascript:void(0)");
    closeBtn.setAttribute("onclick","closeNav()");
    
    document.body.style.overflow = "hidden";
}
function closeNav(){
    document.getElementById('playList').style.display = "none";
    const listBtn = document.getElementById("listIcon");
    listBtn.setAttribute("onclick","openNav()");
    listBtn.innerHTML = this_menu;//"<img src='assets/list-alt.svg' width='32'/>"
    document.getElementById("nowLabel").style.display = "block";
    document.getElementById("nowPlaying").style.display = "block";
    document.getElementById("mainTitle").style.display = "block";
    document.getElementById("currSong").style.display = "none";
    document.getElementById("player").style.display = "block";
    document.getElementById("station_info").style.display = "block";
    document.body.style.overflow = "auto";
}
function addModal(){
    const secDiv = document.createElement("div");
    secDiv.id = "InfoNav";
    secDiv.className = "success_window";
    secDiv.innerHTML = "<div class='success-content'><div class='success-header'>"+
    "<span class='closeBtn' onclick=\'closeNav('InfoNav')\'>&times;</span>" +
    "</div><div class='success-body'>"+
    "<h2>Info</h2>" +
    "<p>In order to NOT make too many requests to server (lapaz.fm), the Playlist is updated every 3mins. Thus, sometimes live playing might differ from nowPlaying info and artwork</p><p><img class='success-svg' src='assets/down_cloud.svg'/> Click on this icon and you can download the playlist, from the moment you opened this page.</p><p>Developed by <a href='https://github.com/ndlopez'>ndzerglink</a></p></div></div>";
    window.onclick = function(ev){
        if (ev.target == secDiv){
            secDiv.style.display = "none";
        }
    }
    return secDiv;
}
