const sections=document.querySelectorAll('[id]');
window.addEventListener('scroll',()=>{
  document.getElementById('progress').style.width=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100)+'%';
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>20);
  const y=window.scrollY+80;
  sections.forEach(s=>{
    const l=document.querySelector(`.nav-links a[href="#${s.id}"]`);
    if(l)l.classList.toggle('active',y>=s.offsetTop&&y<s.offsetTop+s.offsetHeight);
  });
},{passive:true});

function openDrawer(){document.getElementById('drawer').classList.add('open');document.getElementById('drawerOverlay').classList.add('open');document.body.style.overflow='hidden';}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('drawerOverlay').classList.remove('open');document.body.style.overflow='';}

const revealAll=()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
if('IntersectionObserver' in window){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(!e.isIntersecting)return;setTimeout(()=>e.target.classList.add('visible'),+e.target.dataset.delay||0);obs.unobserve(e.target);});},{threshold:0.07,rootMargin:'0px 0px -24px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  setTimeout(revealAll,1400);
}else{revealAll();}
window.addEventListener('load',()=>{revealAll();animateBars();animateStats();});

function animateStats(){
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
    const t=+el.dataset.target,s=el.querySelector('span');let d=false;
    new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!d){d=true;let c=0;const i=setInterval(()=>{c++;s.textContent=c;if(c>=t)clearInterval(i);},t>10?28:150);}
    }).observe(el);
  });
}

function animateBars(){
  document.querySelectorAll('.lang-bar-fill').forEach(b=>{
    new IntersectionObserver(([e])=>{if(e.isIntersecting)b.style.width=b.dataset.width;}).observe(b);
  });
}

const em=()=>'dhruvilbardoliya81'+'@'+'gmail'+'.'+'com';
window.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('#emailDisplay').forEach(el=>el.textContent=em());
});
document.getElementById('emailBtn').addEventListener('click',e=>{e.preventDefault();window.location.href='mai'+'lto:'+em();});
document.getElementById('footerEmail').addEventListener('click',e=>{e.preventDefault();window.location.href='mai'+'lto:'+em();});

const phrases=['BCA Student','Full-Stack Developer','Web Developer','AI Explorer'];
let pi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function type(){
  tel.textContent=del?phrases[pi].slice(0,ci-1):phrases[pi].slice(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci===phrases[pi].length){del=true;setTimeout(type,2000);return;}
  if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;}
  setTimeout(type,del?45:80);
}
setTimeout(type,1000);
