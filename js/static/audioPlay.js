/*
Code to play an audio stream with basic functions: play/pause/stop 
handled by either click or keyboard events.
Also control volume and animations.
Must refer to these code-sources:
 https://codes4education.com/create-custom-music-player-ui-design-in-html-css/
 https://alvarotrigo.com/blog/hamburger-menu-css/
*/
const stream_url = "https://cloudstream2030.conectarhosting.com/8042/stream";
var audioConnect; //= new Audio();
var tina_timer;

window.addEventListener("load",startPlay);

function startPlay(){
    //playStatus = true;
    const svgPlay = document.getElementById("play");
    const svgStop = document.getElementById("stop");
    const gifImg = document.getElementById("gifElm");
    const getTimer = document.getElementById("timerr");
    /*const song_artist = document.getElementById("currSong");
    console.log(song_artist.innerText);// returns null object*/
    let mmss = "";

    const circleImg = '<circle class="paused" stroke-width="4" cx="30" cy="30" r="26"/>';
    const playImg  = '<path class="paused" stroke-linecap="round" stroke-linejoin="round" d="M23 40 L23 20 43 30Z"/>'
    const pauseImg = '<path d="M20 40 L20 20 25 20 25 40Z M35 40 L35 20 40 20 40 40Z" />';
    //gifImg.style.display = "block";
    //gifImg.style.background = "#2e4054";
    audioConnect = new Audio();
    svgPlay.addEventListener("click",playPause);
    svgStop.addEventListener("click",stopPlay);
    document.addEventListener("keydown",function(event){
        /* adding key press events to player */
        if(event.key === "d" || event.key === "D"){
            /* play pressed */
            playPause();
        }
        if(event.key === "s" || event.key === "S"){
            stopPlay();
        }
    });
    
    //gifImg.style.animation = "load 1s 1.2s infinite linear;";
    function playPause(){
        if(audioConnect.paused){
            audioConnect.addEventListener('error',()=>{
                console.error(`Error loading: ${stream_url}`);});
            audioConnect.src = stream_url;
            audioConnect.play();//if not success -> then timer should not start
            audioConnect.loop = true;
            //console.log("this value",audioConnect.startTime,audioConnect.networkState);
            //console.log(audioConnect.loadstart,audioConnect.stalled,audioConnect.playing);
            mmss = getTimer.innerText; // mm:ss
            play_elapsed(parseInt(mmss.substring(0,2)),parseInt(mmss.substring(3,5))); //counter starts or restarts
            //play_elapsed();
            svgPlay.classList.remove("paused");
            svgPlay.classList.add("play_on");
            svgPlay.innerHTML = circleImg + pauseImg;
            svgStop.style.stroke = "#bed2e0";
            svgStop.style.fill = "#bed2e0";
            gifImg.classList.remove("no-audio");
            //change icon to pause btn
        }else{
            audioConnect.pause();
            //resets interval but its possible to send back the 
            //stopped time to interval again
            gifImg.classList.add("no-audio");
            clearInterval(tina_timer);
            svgPlay.innerHTML = circleImg + playImg;
        }
    }
    function stopPlay(){
        /* pauses stream */
        audioConnect.loop = false;
        audioConnect.load(stream_url);
        
        svgPlay.classList.remove("play_on");
        svgPlay.classList.add("paused");
        svgPlay.innerHTML = circleImg + playImg;
        svgStop.style.stroke = "#cc274c";
        svgStop.style.fill = "#cc274c";
        gifImg.classList.add("no-audio");
        //audioConnect.pause();
        
        stop_timer();
    }
}

function volume_mute(vol_stat){
    const volInput = document.getElementById("vol_input");
    const volIcon = document.getElementById("vol_icon");
    const volume_svg = '<path fill="#bed2e0" d="M20 16 C20 8 15 2 15 2 L8 10 2 10 2 22 8 22 15 30 C15 30 20 24 20 16 Z"/>';

    if(vol_stat === 0){
        if(volInput.value != "0"){
            // console.log("volume off");
            // volInput.classList.remove("volume-none");
            // volInput.classList.add("volume-vertical");
            //console.log(audioConnect.volume);
            volIcon.innerHTML = volume_svg;
            // volIcon.src = "assets/volume-repo-off.svg";
            audioConnect.volume = "0";
            volInput.onchange = "0";
            volInput.value = "0";
        }else{
            // console.log("volume on");
            // volInput.classList.remove("volume-vertical");
            // volInput.classList.add("volume-none");
            volIcon.innerHTML = volume_svg + '<path d="M21 2 C21 2 25 6 25 16 25 26 21 30 21 30 M27 4 C27 4 30 8 30 16 30 24 27 28 27 28" />';
            //volIcon.src = "assets/volume-svgrepo.svg";
            volInput.onchange = "0.8";
            volInput.value = "80";
            if(audioConnect !== null){
                audioConnect.volume = "0.8";
            }            
        }
    }
}

function play_elapsed(min=0,sec=0){
    let second,minute;

    tina_timer = setInterval(function(){

        second = (sec<10)?"0"+String(sec):sec;
        minute = (min<10)?"0"+String(min):min;
        
        document.getElementById("timerr").innerText = minute + ":" + second;
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
    /* pauses time */
    clearInterval(tina_timer);
    document.getElementById("timerr").innerText = "00:00";
}

/*
function playControls(){
    //await display_data();
    const playDiv = document.createElement("div");
    playDiv.setAttribute("id","player");
    var texty = '<button onclick="startPlay()"><svg id="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 2 L10 30 24 16 Z" /></svg></button>';
    texty += '<svg id="i-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M23 2 L23 30 M9 2 L9 30" /></svg>';
    playDiv.innerHTML = texty;
    return playDiv;
}
// Record audio from stream -> not easy task :(
const recordBtn = document.getElementById("record");
const recordedAudio = document.getElementById("recordedAudio");
recordBtn.addEventListener('click',async()=>{
    let stream = stream_url;
    let rec = new MediaRecorder(stream);//stream is wrong type
    rec.start();
    let audioChunks = [];
    rec.ondataavailable = e => {
        audioChunks.push(e.data);
    }
    rec.onerror = (e)=>{alert(e.error);}
    rec.onstop = (e)=>{
        let blob = new Blob(audioChunks,{type:'audio/mp4'});
        let url = URL.createObjectURL(blob);
        recordedAudio.src = url;
    }
})*/
