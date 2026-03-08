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