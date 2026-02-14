// Лепестки
const petals=document.querySelector('.petals');
for(let i=0;i<25;i++){
  const p=document.createElement('div');
  p.classList.add('petal');
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=6+Math.random()*6+"s";
  petals.appendChild(p);
}

// Анимации появления
const elements=document.querySelectorAll('.fade-up, .fade-scale');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},{threshold:0.2});
elements.forEach(el=>observer.observe(el));

// Музыка
const music=document.getElementById("bgMusic");
const btn=document.getElementById("playPause");
btn.addEventListener("click",()=>{
  if(music.paused){
    music.play();
    btn.textContent="❚❚";
  }else{
    music.pause();
    btn.textContent="▶";
  }
});

// Таймер
const wedding=new Date("June 27, 2026 17:00:00").getTime();
setInterval(()=>{
  const now=new Date().getTime();
  const d=wedding-now;
  if(d<0)return;

  document.getElementById("days").textContent=
    Math.floor(d/(1000*60*60*24));
  document.getElementById("hours").textContent=
    Math.floor((d%(1000*60*60*24))/(1000*60*60));
  document.getElementById("minutes").textContent=
    Math.floor((d%(1000*60*60))/(1000*60));
  document.getElementById("seconds").textContent=
    Math.floor((d%(1000*60))/1000);
},1000);
