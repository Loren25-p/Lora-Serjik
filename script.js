const music=document.getElementById("bgMusic");
const playPause=document.getElementById("playPause");
const progress=document.getElementById("progress");
const current=document.getElementById("current");
const duration=document.getElementById("duration");
const player=document.querySelector(".player");

/* ЛЕПЕСТКИ */

const petalsContainer=document.querySelector(".petals");

for(let i=0;i<20;i++){
  const petal=document.createElement("div");
  petal.classList.add("petal");
  petal.style.left=Math.random()*100+"%";
  petal.style.animationDuration=6+Math.random()*8+"s";
  petal.style.opacity=0.6+Math.random()*0.4;
  petalsContainer.appendChild(petal);
}

/* АВТОСТАРТ ПО КЛИКУ */

document.addEventListener("click",()=>{
  music.play().catch(()=>{});
},{once:true});

/* ВРЕМЯ */

function formatTime(time){
  const m=Math.floor(time/60)||0;
  const s=Math.floor(time%60)||0;
  return `${m}:${s<10?"0":""}${s}`;
}

music.addEventListener("loadedmetadata",()=>{
  duration.textContent=formatTime(music.duration);
});

playPause.addEventListener("click",()=>{
  if(music.paused){
    music.play();
    playPause.textContent="❚❚";
    player.classList.add("playing");
  }else{
    music.pause();
    playPause.textContent="▶";
    player.classList.remove("playing");
  }
});

music.addEventListener("timeupdate",()=>{
  if(music.duration){
    const percent=(music.currentTime/music.duration)*100;
    progress.value=percent;
    current.textContent=formatTime(music.currentTime);
  }
});

progress.addEventListener("input",()=>{
  if(music.duration){
    music.currentTime=(progress.value/100)*music.duration;
  }
});

/* ТАЙМЕР */

const weddingDate=new Date("June 27, 2026 17:00:00").getTime();

setInterval(()=>{
  const now=new Date().getTime();
  const distance=weddingDate-now;
  if(distance<0)return;

  document.getElementById("days").innerText=
    Math.floor(distance/(1000*60*60*24));
  document.getElementById("hours").innerText=
    Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById("minutes").innerText=
    Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById("seconds").innerText=
    Math.floor((distance%(1000*60))/1000);
},1000);
