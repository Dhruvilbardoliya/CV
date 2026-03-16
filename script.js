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

const phrases=['BCA Student','Aspiring Developer','Web Enthusiast','AI Explorer'];
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

document.getElementById('dlBtn').addEventListener('click',()=>{
  const btn=document.getElementById('dlBtn');
  btn.textContent='Loading...';btn.disabled=true;
  if(window.jspdf){generatePDF();resetBtn();return;}
  function load(src,cb){const s=document.createElement('script');s.src=src;s.onload=cb;s.onerror=()=>src.includes('cloudflare')?load('https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js',cb):(alert('PDF load failed'),resetBtn());document.head.appendChild(s);}
  function resetBtn(){btn.innerHTML='<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Resume';btn.disabled=false;}
  load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',()=>{generatePDF();resetBtn();});
});

function generatePDF(){
  const{jsPDF}=window.jspdf,doc=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W=210,M=18,CW=174;let y=0;
  doc.setFillColor(7,9,15);doc.rect(0,0,W,52,'F');
  doc.setFont('helvetica','bold');doc.setFontSize(26);doc.setTextColor(232,244,255);doc.text('DHRUVIL BARDOLIYA',M,20);
  doc.setFontSize(11);doc.setFont('helvetica','normal');doc.setTextColor(180,220,255);doc.text('BCA Student  |  Aspiring Software Developer',M,30);
  doc.setFontSize(8.5);doc.setTextColor(106,138,170);doc.text('+91 8160797965   |   dhruvilbardoliya81@gmail.com   |   Surat, Gujarat',M,40);
  doc.setDrawColor(180,220,255);doc.setLineWidth(0.5);doc.line(M,47,W-M,47);y=60;
  const sec=t=>{doc.setFont('helvetica','bold');doc.setFontSize(10.5);doc.setTextColor(180,220,255);doc.text(t.toUpperCase(),M,y);doc.setDrawColor(180,220,255);doc.setLineWidth(0.25);doc.line(M,y+2,W-M,y+2);y+=9;};
  const body=(t,i=0)=>{doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(55,68,88);const l=doc.splitTextToSize(t,CW-i);doc.text(l,M+i,y);y+=l.length*5.2;};
  const bold=t=>{doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(20,30,48);doc.text(t,M,y);y+=5.5;};
  const gap=(n=5)=>{y+=n;};
  sec('About');body('BCA student from Surat focused on software development and modern web technologies. Passionate about clean, performant applications and exploring Artificial Intelligence.');gap();
  sec('Education');bold('Bachelor of Computer Applications (BCA)');body('Coursework: DBMS · Web Development · OOP · Operating Systems · Software Engineering',3);gap();
  sec('Projects');bold('Gym Membership Management System');body('VB.Net + MS Access · Authentication · CRUD Operations · Admin Dashboard',3);gap(3);bold('Personal Portfolio Website');body('HTML5 · CSS3 · Vanilla JS · Responsive · GitHub Pages',3);gap();
  sec('Technical Skills');[['Programming','JavaScript, Python'],['Web Dev','HTML5, CSS3, React, Node.js, Express, MongoDB'],['Database','SQL, MS Access'],['Tools','Git, Prompt Engineering, VB.NET, VS Code']].forEach(([c,v])=>{doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(20,30,48);doc.text(c+':',M+2,y);doc.setFont('helvetica','normal');doc.setTextColor(55,68,88);doc.text(v,M+30,y);y+=5.8;});gap();
  sec('Activities');body('Member of college coding club · Peer workshops on web dev and Git · Exploring AI and back-end systems');gap();
  const c2=W/2+5,sy=y;
  doc.setFont('helvetica','bold');doc.setFontSize(10.5);doc.setTextColor(180,220,255);doc.text('LANGUAGES',M,y);doc.setDrawColor(180,220,255);doc.setLineWidth(0.25);doc.line(M,y+2,M+68,y+2);y+=9;
  ['English — Proficient','Hindi — Native','Gujarati — Native'].forEach(l=>{doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(55,68,88);doc.text('· '+l,M+2,y);y+=5.4;});
  y=sy;doc.setFont('helvetica','bold');doc.setFontSize(10.5);doc.setTextColor(180,220,255);doc.text('HOBBIES',c2,y);doc.setDrawColor(180,220,255);doc.setLineWidth(0.25);doc.line(c2,y+2,c2+68,y+2);y+=9;
  ['Cricket','Volleyball','Badminton'].forEach(h=>{doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(55,68,88);doc.text('· '+h,c2+2,y);y+=5.4;});
  doc.setFillColor(7,9,15);doc.rect(0,280,W,17,'F');
  doc.setFontSize(8);doc.setTextColor(106,138,170);doc.text('dhruvilbardoliya81@gmail.com  ·  +91 8160797965  ·  Surat, Gujarat',W/2,288,{align:'center'});
  doc.save('Dhruvil_Bardoliya_Resume.pdf');
}