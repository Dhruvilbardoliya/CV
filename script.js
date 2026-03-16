<<<<<<< HEAD
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-links');

function setActiveNav() {
  const y = window.scrollY + 80;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bot = top + sec.offsetHeight;
    const id  = sec.getAttribute('id');
    const lnk = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (lnk) {
      lnk.classList.toggle('active', y >= top && y < bot);
    }
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

function toggleMenu(e) {
  e.preventDefault();
  e.stopPropagation();
  const open = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
}
hamburger.addEventListener('click',    toggleMenu);
hamburger.addEventListener('touchend', toggleMenu);

navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', e => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

const revealAll = () =>
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = parseInt(e.target.dataset.delay || 0);
      setTimeout(() => e.target.classList.add('visible'), delay);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  setTimeout(revealAll, 1400);
} else {
  revealAll();
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  revealAll();
});

const typedEl = document.getElementById('typed-title');
if (typedEl) {
  const phrases = ['BCA Student', 'Aspiring Developer', 'Web Enthusiast', 'AI Explorer'];
  let pi = 0, ci = 0, deleting = false;
  function type() {
    const cur = phrases[pi];
    typedEl.textContent = deleting ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    if (!deleting && ci === cur.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && ci === 0)           { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, deleting ? 55 : 85);
  }
  setTimeout(type, 1000);
}

function getEmail() {
  return 'dhruvilbardoliya81' + '\u0040' + 'gmail' + '\u002E' + 'com';
}
function openEmail() {
  window.location.href = 'mai' + 'lto:' + getEmail();
  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.show-email').forEach(el => {
    el.textContent = getEmail();
  });
});

document.getElementById('download-btn').addEventListener('click', () => {
  const btn = document.getElementById('download-btn');
  btn.textContent = 'Loading...';
  btn.disabled = true;

  if (window.jspdf) {
    generatePDF();
    resetBtn();
    return;
  }

  function loadLib(src, cb) {
    const s = document.createElement('script');
    s.src = src;
    s.onload = cb;
    s.onerror = () => {
      if (src.includes('cloudflare')) {
        loadLib('https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js', cb);
      } else {
        alert('PDF library failed to load. Please check your internet connection.');
        resetBtn();
      }
    };
    document.head.appendChild(s);
  }

  function resetBtn() {
    btn.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Resume';
    btn.disabled = false;
  }

  loadLib('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', () => {
    generatePDF();
    resetBtn();
  });
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210, M = 18, CW = W - 36;
  let y = 0;

  doc.setFillColor(13, 18, 32);
  doc.rect(0, 0, W, 52, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26); doc.setTextColor(255,255,255);
  doc.text('DHRUVIL BARDOLIYA', M, 21);
  doc.setFontSize(11); doc.setFont('helvetica','normal');
  doc.setTextColor(0,212,170);
  doc.text('BCA Student  |  Aspiring Software Developer', M, 30);
  doc.setFontSize(8.5); doc.setTextColor(180,195,220);
  doc.text('+91 8160797965   |   dhruvilbardoliya81@gmail.com   |   Surat, Gujarat 394210', M, 40);
  doc.setDrawColor(0,212,170); doc.setLineWidth(0.7);
  doc.line(M, 47, W - M, 47);

  y = 60;

  function sec(t) {
    doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor(0,212,170);
    doc.text(t.toUpperCase(), M, y);
    doc.setDrawColor(0,212,170); doc.setLineWidth(0.25);
    doc.line(M, y+2, W-M, y+2); y += 8;
  }
  function body(t, indent=0) {
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(55,68,88);
    const lines = doc.splitTextToSize(t, CW - indent);
    doc.text(lines, M+indent, y); y += lines.length * 5.2;
  }
  function bold(t) {
    doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(18,28,46);
    doc.text(t, M, y); y += 5.5;
  }
  function gap(n=4){ y+=n; }

  sec('About Me');
  body('Currently pursuing a BCA with focus on software development and web technologies. Passionate about building clean, performant applications and exploring Artificial Intelligence.');
  gap();

  sec('Education');
  bold('Bachelor of Computer Applications (BCA)');
  body('Focus: Software Development & Web Technologies', 3);
  body('Coursework: Database Management · Web Development · OOP · Operating Systems · Software Engineering', 3);
  gap();

  sec('Projects');
  bold('Gym Membership Management System');
  body('• VB.Net + MS Access  |  Authentication  |  CRUD Operations  |  Admin Dashboard', 3);
  gap(2);
  bold('Personal Portfolio Website');
  body('• HTML5, CSS3, JavaScript  |  Responsive  |  GitHub Pages', 3);
  gap();

  sec('Technical Skills');
  [
    ['Programming', 'JavaScript, Python'],
    ['Web Dev',     'HTML5, CSS3, React, Node.js, Express, MongoDB'],
    ['Database',    'SQL, MS Access'],
    ['Tools & AI',  'Git, Prompt Engineering, VB.Net'],
  ].forEach(([c,v]) => {
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(18,28,46);
    doc.text(c+':', M+3, y);
    doc.setFont('helvetica','normal'); doc.setTextColor(55,68,88);
    doc.text(v, M+30, y); y+=5.5;
  });
  gap();

  sec('Activities');
  body('• Member of college coding club');
  body('• Conducted peer workshops on web development and version control');
  body('• Continuously learning with a focus on AI and intelligent back-end systems');
  gap();

  const col2 = W/2+5, sy = y;
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor(0,212,170);
  doc.text('LANGUAGES', M, y);
  doc.setDrawColor(0,212,170); doc.setLineWidth(0.25);
  doc.line(M, y+2, M+68, y+2); y+=8;
  ['English — Proficient','Hindi — Native','Gujarati — Native'].forEach(l=>{
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(55,68,88);
    doc.text('• '+l, M+2, y); y+=5.2;
  });

  y=sy;
  doc.setFont('helvetica','bold'); doc.setFontSize(10.5); doc.setTextColor(0,212,170);
  doc.text('HOBBIES', col2, y);
  doc.setDrawColor(0,212,170); doc.setLineWidth(0.25);
  doc.line(col2, y+2, col2+68, y+2); y+=8;
  ['Cricket','Volleyball','Badminton'].forEach(h=>{
    doc.setFont('helvetica','normal'); doc.setFontSize(9); doc.setTextColor(55,68,88);
    doc.text('• '+h, col2+2, y); y+=5.2;
  });

  doc.setDrawColor(0,212,170); doc.setLineWidth(0.25);
  doc.line(M, 283, W-M, 283);
  doc.setFontSize(7.5); doc.setTextColor(150,162,180);
  doc.text('dhruvilbardoliya81@gmail.com  |  +91 8160797965  |  Surat, Gujarat', W/2, 288, {align:'center'});

  doc.save('Dhruvil_Bardoliya_Resume.pdf');
}
=======
/* ============================================================
   DHRUVIL BARDOLIYA — Portfolio JavaScript
   ============================================================ */

// ── SMOOTH NAV HIGHLIGHTING ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');

// Force all visible immediately as fallback
function revealAll() {
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
}

// Use IntersectionObserver if supported, else reveal all
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach((el) => {
    revealObserver.observe(el);
  });

  // Safety net: reveal everything after 1.5s no matter what
  setTimeout(revealAll, 1500);

} else {
  revealAll();
}

// ── HAMBURGER MENU ──
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close on link click
navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ── TYPED TITLE EFFECT ──
const typedEl = document.getElementById('typed-title');
if (typedEl) {
  const phrases = [
    'BCA Student',
    'Aspiring Developer',
    'Web Enthusiast',
    'AI Explorer',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function typeLoop() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 90);
  }
  setTimeout(typeLoop, 1200);
}

// ── NAV BACKGROUND on SCROLL ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(8,12,20,0.95)'
    : 'rgba(8,12,20,0.85)';
});

// ── DOWNLOAD RESUME ──
document.getElementById('download-btn').addEventListener('click', () => {
  // Load jsPDF dynamically then generate PDF
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  script.onload = () => { generatePDF(); };
  document.head.appendChild(script);
});

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = 210;
  const margin = 18;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ── HEADER BACKGROUND ──
  doc.setFillColor(13, 18, 32);
  doc.rect(0, 0, pageW, 52, 'F');

  // ── NAME ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text('DHRUVIL BARDOLIYA', margin, 22);

  // ── TITLE ──
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 212, 170);
  doc.text('BCA Student  |  Aspiring Software Developer', margin, 31);

  // ── CONTACT LINE ──
  doc.setFontSize(8.5);
  doc.setTextColor(180, 195, 220);
  doc.text('+91 8160797965   |   dhruvilbardoliya81@gmail.com   |   Surat, Gujarat 394210', margin, 41);

  // ── ACCENT LINE ──
  doc.setDrawColor(0, 212, 170);
  doc.setLineWidth(0.8);
  doc.line(margin, 48, pageW - margin, 48);

  y = 62;

  // ── HELPER FUNCTIONS ──
  function sectionTitle(title) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 212, 170);
    doc.text(title.toUpperCase(), margin, y);
    doc.setDrawColor(0, 212, 170);
    doc.setLineWidth(0.3);
    doc.line(margin, y + 2, pageW - margin, y + 2);
    y += 9;
  }

  function bodyText(text, indent = 0, color = [60, 70, 90]) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentW - indent);
    doc.text(lines, margin + indent, y);
    y += lines.length * 5.5;
  }

  function boldText(text, indent = 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 30, 48);
    doc.text(text, margin + indent, y);
    y += 6;
  }

  function gap(size = 4) { y += size; }

  // ── ABOUT ──
  sectionTitle('About Me');
  bodyText('Currently pursuing a Bachelor of Computer Applications (BCA) with a focus on software development and web technologies. Passionate about building clean, performant applications. Continuously exploring Artificial Intelligence and intelligent back-end systems.');
  gap();

  // ── EDUCATION ──
  sectionTitle('Education');
  boldText('Bachelor of Computer Applications (BCA)');
  bodyText('Focus: Software Development & Web Technologies', 3);
  bodyText('Coursework: Database Management Systems · Web Development · OOP · Operating Systems · Software Engineering', 3);
  gap();

  // ── PROJECTS ──
  sectionTitle('Projects');
  boldText('Gym Membership Management System');
  bodyText('Web application built with VB.Net and MS Access database.', 3);
  bodyText('• User authentication system (login/logout)', 3);
  bodyText('• Full CRUD operations for member records', 3);
  bodyText('• Membership tracking and admin dashboard', 3);
  gap(2);
  boldText('Personal Portfolio Website');
  bodyText('Responsive portfolio site built with pure HTML5, CSS3 & JavaScript. Smooth animations, mobile-friendly, deployed on GitHub Pages.', 3);
  gap();

  // ── SKILLS ──
  sectionTitle('Technical Skills');
  const skills = [
    ['Programming',    'JavaScript, Python'],
    ['Web Dev',        'HTML5, CSS3, React, Node.js, Express, MongoDB'],
    ['Database',       'SQL, MS Access'],
    ['Tools & AI',     'Git, Prompt Engineering, VB.Net'],
  ];
  skills.forEach(([cat, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 30, 48);
    doc.text(cat + ':', margin + 3, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 70, 90);
    doc.text(val, margin + 32, y);
    y += 6;
  });
  gap();

  // ── ACTIVITIES ──
  sectionTitle('Activities');
  bodyText('• Active member of college coding club');
  bodyText('• Conducted peer workshops on web development and version control');
  bodyText('• Continuously learning new technologies with a focus on AI and back-end systems');
  gap();

  // ── LANGUAGES & HOBBIES (two columns) ──
  const col1X = margin;
  const col2X = pageW / 2 + 5;
  const savedY = y;

  // Left: Languages
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 212, 170);
  doc.text('LANGUAGES', col1X, y);
  doc.setDrawColor(0, 212, 170);
  doc.setLineWidth(0.3);
  doc.line(col1X, y + 2, col1X + 70, y + 2);
  y += 9;
  ['English — Proficient', 'Hindi — Native', 'Gujarati — Native'].forEach(lang => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 70, 90);
    doc.text('• ' + lang, col1X + 3, y);
    y += 5.5;
  });

  // Right: Hobbies
  y = savedY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 212, 170);
  doc.text('HOBBIES', col2X, y);
  doc.setDrawColor(0, 212, 170);
  doc.setLineWidth(0.3);
  doc.line(col2X, y + 2, col2X + 70, y + 2);
  y += 9;
  ['Cricket', 'Volleyball', 'Badminton'].forEach(h => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 70, 90);
    doc.text('• ' + h, col2X + 3, y);
    y += 5.5;
  });

  // ── FOOTER ──
  doc.setDrawColor(0, 212, 170);
  doc.setLineWidth(0.3);
  doc.line(margin, 284, pageW - margin, 284);
  doc.setFontSize(8);
  doc.setTextColor(150, 160, 180);
  doc.text('dhruvilbardoliya81@gmail.com   |   +91 8160797965   |   Surat, Gujarat', pageW / 2, 289, { align: 'center' });

  // ── SAVE ──
  doc.save('Dhruvil_Bardoliya_Resume.pdf');
}

// ── STAGGER reveal items with delay ──
document.querySelectorAll('[data-stagger]').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 80;
    revealObserver.observe(child);
  });
});
>>>>>>> 6f66860cc3057cc37ecb0fee3cdded46349b91f2
