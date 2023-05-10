/*
    https://www.panamericana.bo/media/radiopanamerica/images/2021/01/01/2021010100000073897.png
    check this https://codes4education.com/create-custom-music-player-ui-design-in-html-css/
    https://cdn.freebiesupply.com/images/large/2x/music-player-web-ui-design-b48.jpg
    const stream_url = "https://rfcmedia3.streamguys1.com/thirdrock.mp3";
    alt-x logo: "https://static.wixstatic.com/media/143966_f7c1536f838a4adb890693dcdbf8423f~mv2.jpg/v1/fill/w_498,h_491,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/113fm_alt_x_1001.jpg" 

    history: https://player.181fm.com/external.php?http%3A%2F%2Flisten.181fm.com%3A8443%2Fice_history.php?h=listen.181fm.com&p=7080&i=181-90salt_128k.mp3&https=&f=ice&c=802268
    80s: "assets/181fm_logo.png"
    thebuzz_hist: https://player.181fm.com/external.php?http%3A%2F%2Flisten.181fm.com%3A8443%2Fice_history.php?h=listen.181fm.com&p=7080&i=181-buzz_128k.mp3&https=&f=ice&c=128773
*/
const no_id3 = 6; //@stations, from this index no requests

const stations = [
    {
        name: "Adult Contemporary",
        logo: "assets/fmlapaz_logo.png",
        stream_url: "https://drive.google.com/uc?export=download&id=1kyzoldMRcf9NxJ-DSnQew4P-xCjn77OM",
        id3_info: "https://cloudstream2030.conectarhosting.com/cp/get_info.php?p=8042",
        description: "LaPaz.fm - Mas m\u00FAsica menos palabras. La radio hecha a tu medida.",
        site: "fmlapaz.html",
        xtra_info: ["Adult Contemporary","English",128,true]
    },{
        name: "La n\u00FAmero uno",
        logo: "assets/stereo97.jpg",
        stream_url: "https://stream.consultoradas.com/8104/stream",
        id3_info: "https://stream.consultoradas.com/cp/get_info.php?p=8104",
        description: "Stereo97 - Soy parte de ti, lleno tu vida con alegria. Soy mas que tu amigo yo quiero estar en tu coraz\u00F3n.",
        site: "",
        xtra_info: ["La n\u00FAmero uno", "Spanish",128,true]
    },{
        name: "181.fm",
        logo: "https://lastfm.freetls.fastly.net/i/u/300x300/accb1e554ea0afbac1fcc02a7413ed87.png",
        stream_url: "https://listen.181fm.com/181-awesome80s_128k.mp3?aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1606271347",
        id3_info: "https://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-awesome80s_128k.mp3&https=&f=ice&c=186052",
        description: "Awesome 80's - The Best Choice for Radio. Your Lifestyle, Your Music.",
        site: "",
        xtra_info: [" - Awesome 80's","English",128,true]
    },{
        name: "181.fm",
        logo: "assets/90s_alt.jpg",
        stream_url: "https://listen.181fm.com/181-90salt_128k.mp3?listenerId=esAdblock0185051&aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1670381772",
        id3_info: "https://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-90salt_128k.mp3&https=&f=ice&c=802257",
        description: "Listen to the best Alternative-Rock hits of the 90s",
        site: "",
        xtra_info: [" - 90's Alternative","English",128,true]
    },{
        name: "The Buzz",
        logo: "assets/alt-rock.jpg",
        stream_url: "https://listen.181fm.com/181-buzz_128k.mp3?listenerId=esAdblock0523084&aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1672012878",
        id3_info: "https://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-buzz_128k.mp3&https=&f=ice&c=128782",
        description: "Listen to the best Alternative-Rock hits",
        site: "",
        xtra_info: [" - Alternative-Rock","English",128,true]
    },{
        name:"181.fm",
        logo:"assets/classicalMusic.jpg",
        stream_url:"https://listen.181fm.com/181-classical_128k.mp3?listenerId=esAdblock0185051&aw_0_1st.playerid=esPlayer&aw_0_1st.skey=1670382069",
        id3_info:"https://player.181fm.com/streamdata.php?h=listen.181fm.com&p=7080&i=181-classical_128k.mp3&https=&f=ice&c=818600",
        description:"Classical Music - characterized by formality and complexity in its musical form and harmonic organization.",
        site:"",
        xtra_info:["Classical","English",128,true]
    },{
        name:"Third Rock Radio",
        logo: "assets/thirdRockRadio.jpg",
        stream_url:"https://rfcmedia3.streamguys1.com/thirdrock-sgplayer.aac",
        id3_info: "",
        description: "Explore and discover new worlds of music with NASA's Radio.",
        site: "https://feed.tunein.com/profiles/s151799/nowPlaying",
        xtra_info:["Alternative-Rock","English",196,false]
    },{
        name: "113.fm",
        logo: "assets/113fm_classicone_1008.jpg",
        stream_url: "https://113fm-atunwadigital.streamguys1.com/1008",
        id3_info: "",
        description: "Classic One - Your radio station for the very best Classical and Piano Greats!",
        site: "",
        xtra_info: ["Classical","English",128,true]
    },{
        name: "Panamericana",
        logo: "assets/pana148.png",
        stream_url: "https://stream-28.zeno.fm/pnwpbyfambruv?zs=7zM3ROeGQVmyOAzN9Khz5A",
        id3_info: "",
        description: "La radio que todos tienen encendida desde la ma\u00f1ana.",
        site: "",
        xtra_info: ["Noticias y m\u00FAsica en espa\u00F1ol", "Espanol",112,true]
    },{
        name: "Phantogram",
        logo: "assets/phantogram.jpg",
        stream_url: "Three",
        id3_info: "You don't get me high anymore",
        description: "",
        site: "",
        xtra_info: ["","English",128,false]
    }
];
const awfulArt = ["https://stream.consultoradas.com/cp/musiclibrary/nowplay_fmlapaz.png",
"https://i.scdn.co/image/ab67616d0000b273852527d582b377f1543129a3",
"https://i.scdn.co/image/ab67616d0000b2737515ba4e369a9526d7d4dfde",
"https://i.scdn.co/image/ab67616d0000b27344789c72043033cd97924059",
"https://stream.consultoradas.com/cp/musiclibrary/nocover.png",
"https://i.scdn.co/image/ab67616d0000b273946c1699a48b214e45f765d6",
"https://i.scdn.co/image/ab67616d0000b2736d7a8a34f348d587f007045f",
"https://i.scdn.co/image/ab67616d0000b273d4af276af7f96299274d4b1b",
"https://i.scdn.co/image/ab67616d0000b273e8e71ebc372dfa978fc0581f"];

const info_keys = ["Genre","Language","Bitrate","Ads"];
const svg_elm = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" stroke="#2e4054" fill="#bed2e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle class="paused" cx="18" cy="18" r="18"/><path fill="#2e4054" class="paused" d="M13 8 L13 28 26 18 Z" /></svg>';
const svg_btn = '<svg class="col_half float_left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60" stroke="#2e4054" fill="#bed2e0">'
const circleImg = '<circle class="paused no_mobil" stroke-width="4" cx="30" cy="30" r="26"/>';
const circle_img = '<circle class="paused" stroke-width="4" cx="30" cy="30" r="26"/>';
const playImg  = '<path class="paused" stroke-linecap="round" stroke-linejoin="round" d="M23 40 L23 20 43 30Z"/>'
const stopImg = '<path d="M20 40 L20 20 40 20 40 40 Z" />';
const pauseImg = '<path d="M20 40 L20 20 25 20 25 40Z M35 40 L35 20 40 20 40 40Z" />';
const reloadImg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="#ffeea6" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M29 16 C29 22 24 29 16 29 8 29 3 22 3 16 3 10 8 3 16 3 21 3 25 6 27 9 M20 10 L27 9 28 2" /></svg>';
const defaultImg = "https://lastfm.freetls.fastly.net/i/u/300x300/accb1e554ea0afbac1fcc02a7413ed87.png";
// emptyImg: https://lastfm.freetls.fastly.net/i/u/300x300/31bba5ca59edf033d87f791284b38ea4.png
const errTitle = ["Radio Online","Music Promo60","Music Promo30","Listen.FM"];
const updateTime = 185000 //ms
let myReg = RegExp("[(][^)]*[)]");//find parentheses
let cardHeight = "auto";
let img_size = 100; //card Image size

let audioConnect = new Audio();
let isPlaying;
let tina_timer;

init_this();

function display_all_stations(){
    /* Build one card for each station*/
    const containDiv = document.getElementById("amia");
    const mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","outer_div");
    
    for(let idx = 0; idx < (stations.length -1); idx++){
        const rowDiv = document.createElement("div");
        rowDiv.setAttribute("class","row round-border smoke-bkg bottom-10px card");
        rowDiv.setAttribute("id","station_"+idx);
        rowDiv.setAttribute("onclick","init_player("+idx+")");
        rowDiv.style.float= "left";
        
        rowDiv.style.height = cardHeight;
        /*rowDiv.style.backgroundImage = "url('" + stations[idx].logo +"')";
        rowDiv.style.backgroundRepeat = "no-repeat";
        rowDiv.style.backgroundSize = "cover";*/
        /*colImg:class=float_left    colArtist:class=float_left*/
        rowDiv.innerHTML = "<div class='colImg' id='imgDiv_"+ idx + "'><img src='" + stations[idx].logo + "' width='" + img_size + "%' height='" + img_size +
        "%'/></div><div class='colArtist' id='artistDiv_" + idx + "'>" + 
        /*"<span>"+stations[idx].name + "</span>"+*/"</div>";
        /*stations[idx].name + "</span><span>" + stations[idx].xtra_info[0] + "</span></div>";*/
        //<div class='colTime float_left'><span id='timer_" + idx + "'>00:00</span></div>";
        mainDiv.appendChild(rowDiv);
    }
    containDiv.appendChild(mainDiv);
}

function init_this(){
    display_all_stations();
    //build_case(stations.length,stations.name,stations.id3_info,stations.stream_url,stations.logo);
    /*for (let idx=0;idx<stations.length;idx++) {display_data(idx);}*/
    update_stations();
}

function update_this(){
    // update_stations();
    display_data(isPlaying);
}

let updater = setInterval(update_this,updateTime);

//window.addEventListener("load",startPlay);//for autoplay
function init_player(stream_idx){
    // console.log("gotStream",stream_idx);
    isPlaying = stream_idx;
    clearInterval(updater);
    console.log("Time updater restarted");
    updater = setInterval(update_this,updateTime)
    stopPlay();
    playStop(isPlaying);
    display_data(isPlaying);
}

function playStop(idx){
    const svgPlay = document.getElementById("play2");
    svgPlay.addEventListener("click",stopPlay); /*function(){
        console.log("passing index",idx); stopPlay(idx);});*/
    const gifImg = document.getElementById("gifElm");
    // let getTimer = document.getElementById("timer");
    let mmss = "";
    
    if(audioConnect.paused){
        audioConnect.src = stations[idx].stream_url;
        audioConnect.play();//if not success -> then timer should not start
        audioConnect.loop = true;
        //counter starts or restarts
        mmss = "00:00";//document.getElementById("timer_"+idx).innerText;
        play_elapsed(parseInt(mmss.substring(0,2)),parseInt(mmss.substring(3,5)),idx); 
        svgPlay.classList.remove("paused");
        svgPlay.classList.add("play_on");
        svgPlay.innerHTML = circleImg + stopImg;

        gifImg.classList.remove("no-audio");
    }else{
        audioConnect.pause();
        audioConnect.loop = false;
        gifImg.classList.add("no-audio");
        clearInterval(tina_timer);
        svgPlay.classList.remove("play_on");
        svgPlay.classList.add("paused");
        svgPlay.innerHTML = circleImg + playImg;
        stop_timer();
    }
}

function stopPlay(){/* param: idx=0 */
    const gifImg = document.getElementById("gifElm");
    const svgPlay = document.getElementById("play2");
    // svgPlay.addEventListener("click",function(){ playStop(idx); });
    // const float_btn = document.getElementById("play_btn");
    audioConnect.pause();
    audioConnect.loop = false;
    gifImg.classList.add("no-audio");
    clearInterval(tina_timer);
    svgPlay.classList.remove("play_on");
    svgPlay.classList.add("paused");
    svgPlay.innerHTML = circleImg + playImg;
    
    stop_timer();
}

function volume_mute(vol_stat){
    const volInput = document.getElementById("vol_input");
    const volIcon = document.getElementById("vol_icon");

    if(vol_stat === 0){
        if(volInput.value != "0"){
            // console.log("volume on");
            // volInput.classList.remove("volume-none");
            // volInput.classList.add("volume-vertical");
            volIcon.src = "assets/volume-repo-off.svg";
            audioConnect.volume = "0";
            volInput.onchange = "0";
            volInput.value = "0";
        }else{
            // volInput.classList.remove("volume-vertical");
            // volInput.classList.add("volume-none");
            volIcon.src = "assets/volume-svgrepo.svg";
            volInput.onchange = "0.8";
            volInput.value = "80";
            if(audioConnect !== null){
                audioConnect.volume = "0.8";
            }            
        }
    }
}

function play_elapsed(min=0,sec=0){//,jdx
    let second,minute;

    tina_timer = setInterval(function(){
        second = (sec<10)?"0"+String(sec):sec;
        minute = (min<10)?"0"+String(min):min;
        
        document.getElementById("timer").innerText = minute + ":" +second;
        sec++;
        if(sec>59){
            min++;
            sec=0;
        }
        /* if listen hours
        if(min>59 && sec>59){hours++;min=0;sec=0;}*/
        //timer case: if(sec < 0){clearInterval(tina_timer);}
    },1000);
}

function stop_timer(){
    /* pauses timer */
    clearInterval(tina_timer);
}

function build_case(jdx, artist, song, album, artwork){
    const timeNow = new Date();
    let search_link = "";
    if( typeof album === 'undefined'){ album = artist;}
    if(jdx < no_id3){
        search_link = "<a title='Click for more info' href='https://duckduckgo.com/?q=" + 
    artist.trim().replace(/\s+/g,"%20").replace(/'/g,"") + "+" + 
    song.trim().replace(/\s+/g,"%20").replace(/'/g,"") +
    "&t=ffcm&atb=v319-1&ia=web' target='_blank'> <img src='assets/duck.svg' width='36'/></a>";
    }
    const this_html = "<div class='bkg_cd_icon' id='coverCD'><a href='" + stations[jdx].site + 
    "'><img src='" + artwork + "' width='248'/></a></div><div class='cardTitle smoke-bkg padding_15 small round-border'><h2 class='headLabel'>" + 
    song + "</h2><h2>" + artist + "</h2><h2 class='lighter'>" + 
    album + search_link + "</h2></div>";
    const up_time = document.getElementById("update_time");
    up_time.innerHTML = "<h2 class='lighter'>&#x231A;" +
    zeroPad(timeNow.getHours()) + ":" + zeroPad(timeNow.getMinutes());// + "</h2>";
    //onClick sleep timer starts
    up_time.addEventListener("click",sleepy);
    
    return this_html;
}

function sleepy(){
    if(confirm("Streaming will end after 60 minutes, ok?")){
        setTimeout(stopPlay,(60*60*1000));//1hour=60*60*1000
        clearInterval(updater);
    }else{
        console.log("Sleepy canceled");return;}
    
    // alert("I will go to sleep in 60 minutes.");
}

async function update_stations(){
    var gotData = "", auxLink = "";

    for(let idx = 0; idx < (stations.length -1); idx++){
        gotData = {
            artist: stations[idx].xtra_info[0],song: stations[idx].name};
            /*nowPlaying:{artist: stations[idx].description, song:stations[idx].name},
            album: stations[idx].xtra_info[0],artwork: stations[idx].logo;*/

        if(idx < no_id3){
            gotData = await get_id3(idx);// {artist,song,artwork}
            //get_artwork(idx);//returns {{artist, song},album,artwork}
        }
        
        auxLink = "";
        const this_artist = document.getElementById("artistDiv_"+idx);
        
        //auxLink = "<span class='small'>" + stations[idx].name + "</span>";
        if( idx < no_id3 ){ 
            auxLink = "<span class='small'>" + stations[idx].name + 
            /*stations[idx].xtra_info[0] +*/ "</span>"; }
        if(isPlaying == idx){
            //auxLink = "";//img_size = 80;played.push(idx); 
            document.title = gotData.artist + "-" + gotData.song;
            document.getElementById("station_"+idx).style.display = "none";
            // console.log("Removing:",isPlaying);
        }else{
            document.getElementById("station_"+idx).style.display = "block";
            // console.log("keeping:",idx);
        }
        
        this_artist.innerHTML = "<span class='headLabel oneLine'>" + gotData.song +
        "</span><span class='oneLine'>" + gotData.artist + "</span>" + auxLink;

        /*Update artwork of station by artist
        auxLink = stations[idx].logo;
        const this_img = document.getElementById("imgDiv_"+idx);
        this_img.innerHTML = "<img src='" + auxLink + "' width='"+ img_size + "' height='" + img_size + "'/>";*/

        /* adding album info to <data-?> tag */
        auxLink = gotData.artwork;
        if(idx < 2){//==0 LaPaz.fm, gotData={artist,song,artwork}
            if(awfulArt.includes(gotData.artwork)){
                auxLink = stations[0].logo;
            }else{
                auxLink = gotData.artwork;
            }
        }else{ auxLink = ""; }
        const this_row = document.getElementById("station_"+idx);
        this_row.setAttribute("data-album",auxLink);
    }
}

async function display_data(idx){
    // Function to request artwork from ext-source, not valid for idx=0
    await update_stations();
    
    const got_row = document.getElementById("station_"+idx);
    const got_artist = got_row.getElementsByClassName("colArtist");
    
    let gotSong = got_artist[0].firstChild.childNodes[0].data;
    let gotArtist = got_artist[0].childNodes[1].firstChild.data;
    if( (typeof gotSong === 'undefined') || (typeof gotArtist === 'undefined')){
        gotSong = "No id3 found"; gotArtist = "No artist";
    }
    
    var gotData = "";
    if(idx > 1){ gotData = await get_artwork(idx,gotArtist,gotSong);}

    let this_artwork = gotData.artwork;
    if(idx < 2){ this_artwork = got_row.getAttribute("data-album"); }
    if(gotData.artwork === ""){
        console.log("Error: No artwork found",idx,gotData.artwork);
        this_artwork = stations[idx].logo;//"assets/cd_case.svg";
    }
    const coverDiv = document.getElementById("artwork");
    /*coverDiv.innerHTML = build_case(idx, got_artist[0].childNodes[1].firstChild.data,
        gotSong, got_row.getAttribute("data-album"),newArt);*/
    coverDiv.innerHTML = build_case(idx, gotArtist, gotSong, gotData.album, this_artwork);
    
    // Update artwork of station_idx Div
    /*const got_artwork  = document.getElementById("imgDiv_" + idx);
    let newArt = this_artwork;//got_artwork[0].firstChild.src;
    got_artwork.innerHTML = "<img src='" + newArt + "' width='" + img_size + 
    "' height='"+ img_size + "'/>"*/
    //console.log("newArt",newArt.substring(newArt.length-3));
    /*if(newArt.substring(newArt.length - 3) === "svg"){
        newArt = stations[idx].logo;//console.log("is it cd_case?");}*/
    
    // Updating player2: elements
    var auxText = "";
    const cover_art = document.getElementById("cover_art");
    cover_art.setAttribute("onclick","display_data(" + idx + ")");//"update_stations()"
    auxText = "<div class='above_img'>" + reloadImg + "</div>";

    cover_art.innerHTML = "<img src='" + this_artwork +
    "' width='60' height='60'/>" + auxText;

    auxText = gotArtist;
    if(idx > no_id3){ auxText = stations[idx].xtra_info[0]; }
    
    let newTitle = gotSong + " - " + gotArtist;

    if(gotSong.length < 21){
        newTitle = gotSong;
        console.log(idx,"length",gotSong.length);
    }else{
        auxText = "";
    }
    document.getElementById("cover_title").innerHTML = "<span class='headLabel'>" + 
    newTitle + "</span><span>" + auxText + "</span>";
    
    document.getElementById("title_stat").innerText = stations[idx].name + " ♪ " + 
    stations[idx].description;
}

async function get_id3(idx){
    const response = await fetch(stations[idx].id3_info);
    const data = await response.json();
    
    const this_output = {
        artist:stations[idx].name,
        song:stations[idx].xtra_info[1],
        artwork:stations[idx].logo};
    let artist = "", artwork = "";
    let song = data["title"].replace(myReg,"").replace(/&/g,"and");
    if(idx < 2 ){// prev == 0
        if(Object.keys(data).length < 1){
            return this_output;
        }
        // console.log("Got",idx,Object.keys(data).length);
        const auxStr = song.split("-");
        if (auxStr.length < 2){
            auxStr.push("No title");
        }
        artist = auxStr[1];
        song = auxStr[0];
        artwork = data["art"];
    }else{
        artist = data["artist"].replace(/&/g,"and");
    }
    // console.log("got:",data["title"],song);
    if(errTitle.includes(song.trim())){
        artwork = stations[idx].logo;
    }
    return {artist,song,artwork};
}

async function get_artwork(jdx,artist_name,song_title){
    let album = "", artwork = stations[jdx].logo;
    /*Fetch artwork from another source, must get first id3 */
    const nowPlaying = {
        artist: artist_name, song: song_title };
        //await get_id3(jdx); // {artist,song,artwork}

    if(errTitle.includes(nowPlaying.song.trim()) || (jdx < 2) || (jdx > (no_id3 - 1))){
        console.log("No artwork requests for ",stations[jdx].name);
        return {nowPlaying,album,artwork};
    }
    const this_url = "https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=16fe44aaa6f35d5755a08eb62f371994&artist="+
    nowPlaying.artist.trim().replace(/\s+/g,"%20") + "&track=" + 
    nowPlaying.song.trim().replace(myReg,"").replace(/\s+/g,"%20") + "&format=json";
    
    try {
        const response = await fetch(this_url)
        const data = await response.json();
        
        if(typeof data["track"]["album"] !== 'undefined'){
            artwork = data["track"]["album"]["image"][3]["#text"];
            album = data["track"]["album"]["title"];
        }else{
            artwork = "";
            album = "";
        }
        // console.log("artwork",artwork,"album",album);
    } catch (error) {
        console.log("got an error",jdx,error);
        //return {nowPlaying, album, artwork};
    }
    if (artwork === defaultImg){
        artwork = stations[jdx].logo;
    }
    // console.log("gotArt:",artwork);
    return {nowPlaying, album, artwork};
}

function zeroPad(timeElm){
    return (parseInt(timeElm,10) < 10 ? '0' : '') + timeElm;
}

function openNav(){
    /* open and close Info modal. works onMobil only*/
    if(navigator.userAgent.match(/(iPhone|iPad|Android|IEMobile)/)){    
        const titleDiv = document.getElementById("cover_title");
        titleDiv.setAttribute("onclick","closeNav()");
        /*closeBtn.style.margin = "0";
        closeBtn.setAttribute("class","col10 float_left closeBtn");
        closeBtn.setAttribute("href","javascript:void(0)");
        closeBtn.setAttribute("onclick","closeNav()");*/
        document.getElementById("amia").style.display = "none";
        document.getElementById("artwork").style.display = "block";
        // document.getElementById("station_info").style.display = "none";
        document.body.style.overflow = "hidden";
    }
}
function closeNav(){
    const titleDiv = document.getElementById("cover_title");
    titleDiv.setAttribute("onclick","openNav()");
    document.getElementById("artwork").style.display = "none";
    document.getElementById("amia").style.display = "block";
    //document.getElementById("station_info").style.display = "block";
    document.body.style.overflow = "auto";
}
