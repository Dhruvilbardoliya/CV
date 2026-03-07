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
  // Creates a simple text resume for download
  const resume = `DHRUVIL BARDOLIYA
BCA Student | Aspiring Software Developer
==========================================

CONTACT
Phone   : +91 8160797965
Email   : dhruvilbardoliya81@gmail.com
Address : Surat, Gujarat 394210

EDUCATION
Bachelor of Computer Applications (BCA)
Focus: Software Development & Web Technologies
Coursework: DBMS, Web Development, OOP, OS, Software Engineering

PROJECTS
Gym Membership Management System
  - Platform : Web Application (VB.Net + MS Access)
  - Features : Authentication, CRUD Operations, Member Tracking

TECHNICAL SKILLS
  Programming   : JavaScript, Python
  Web Dev       : HTML, CSS3, React, Node.js, Express, MongoDB
  Database      : SQL, MS Access
  Tools         : Git, Prompt Engineering

LANGUAGES
  English, Hindi, Gujarati

HOBBIES
  Cricket, Volleyball, Badminton

ACTIVITIES
  - Member of college coding club
  - Conducted peer workshops on web development and version control
  - Continuously learning AI and intelligent back-end systems
`;

  const blob = new Blob([resume], { type: 'text/plain' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Dhruvil_Bardoliya_Resume.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// ── STAGGER reveal items with delay ──
document.querySelectorAll('[data-stagger]').forEach(parent => {
  Array.from(parent.children).forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 80;
    revealObserver.observe(child);
  });
});