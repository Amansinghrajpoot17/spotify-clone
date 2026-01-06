console.log("Welcome to Spotify");
function formatTime(seconds) {
  seconds = Math.floor(seconds); // remove decimals if any
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;

  // Add leading zero if needed
  if (minutes < 10) minutes = "0" + minutes;
  if (secs < 10) secs = "0" + secs;

  return `${minutes}:${secs}`;
}

async function getsongs() {
   let a = await fetch("http://127.0.0.1:5500/project/spotify%20clone/songs/")
   let response = await a.text();
   console.log(response);
 let div= document.createElement('div');
 div.innerHTML=response;
  let as= div.getElementsByTagName("a")
 console.log(as);
 let songs= [];
for (let index = 0; index < as.length; index++) {
  const element = as[index];
  if(element.href.endsWith(".mp3")){
    songs.push(element.href.split("/songs/")[1]);
  }
}
return(songs);

}
let currentSong = new Audio();
let play=document.getElementById("play");
let playMusic= (track, pause=false)=>{
  // let audio= new Audio("songs/"+ track);
  // audio.play(); 
  currentSong.src="songs/"+ track;
  if(!pause)
  currentSong.play();
  play.src="pause.svg";
  document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
  document.querySelector(".songtime").innerHTML="00:00  00:00"
}
 
async function main() {
 
   let songs=await getsongs();
console.log(songs);
playMusic(songs[0]);
let songul=  document.querySelector(".song-list");
for (const song of songs) {
 songul.innerHTML += `
  <li>
    <img src="music.svg" alt="">
    <div class="info">
      <div>${song.replaceAll("%20", " ").replaceAll("%26", " ")}</div>
      <div>AMAN</div>
    </div>
    <div class="play">
      <span>Play now!</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="rgb(32,32,32)" class="bi bi-play" viewBox="0 0 30 30" filter="invert(1)">
        <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z"></path>
      </svg>
    </div>
  </li>`;
}
// ATTACH EVENT LISTENERS TO EACH SONG
Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e=>{
  e.addEventListener("click", ()=>{

  
  console.log(e.querySelector(".info").firstElementChild.innerHTML);
 playMusic(e.querySelector(".info").firstElementChild.innerHTML)  
});

  })
// Attach event listeners to previous, play, and next buttons
play.addEventListener("click", ()=>{
  if(currentSong.paused){
    currentSong.play();
    setPauseIcon();
  }
  else{
    currentSong.pause();
    setPlayIcon();
  }
})

}
function setPauseIcon() {
  play.innerHTML = `
 <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 40 42" version="1.1">
<title>play</title>
<path d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"/>
</svg>
  `;
  
}


function setPlayIcon() {
 play.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 23 23" fill="none">
<path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
}

// listen time update of current song
currentSong.addEventListener("timeupdate",()=>{
  console.log(currentSong.currentTime, currentSong.duration);
  document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)} // ${formatTime(currentSong.duration)  }`
    document.querySelector(".circle").style.left= ((currentSong.currentTime)/(currentSong.duration))*100 +"%"
 
})
// ADD AN EVENT LISTENER FOR SEEKBAR
document.querySelector(".seekbar").addEventListener("click", e=>{
  let percent=( e.offsetX/e.target.getBoundingClientRect().width)*100
  document.querySelector(".circle").style.left= percent +"%";
  currentSong.currentTime=(currentSong.duration*percent)/100;
});

  // Add an event listener for hambuurger
  document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").classList.add("show-left");
  })
  // Add an event listener for close svg
  document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").classList.remove("show-left");
  })

main();



  
  
  
  
  

 
