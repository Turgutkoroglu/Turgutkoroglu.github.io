// ---------------------------------------------------------------
// Mobil menü aç/kapat
// ---------------------------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const tabnav = document.querySelector('.tabnav');

menuToggle.addEventListener('click', () => {
  const isOpen = tabnav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Bir linke tıklayınca mobil menüyü kapat
document.querySelectorAll('.tab').forEach(link => {
  link.addEventListener('click', () => {
    tabnav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------------------
// Hero'da basit yazı (typing) efekti
// ---------------------------------------------------------------
const roles = ['Computer Engineer', 'Web Developer', 'Software Enthusiast', 'Tech Explorer', 'Problem Solver', 'Innovative Thinker', 'Continuous Learner', 'Team Player', 'Creative Coder', 'Passionate Programmer'];
const typeTarget = document.getElementById('typeTarget');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];

  if (!deleting) {
    charIndex++;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typeTarget.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 80);
}

if (typeTarget) {
  typeTarget.textContent = '';
  setTimeout(typeLoop, 600);
}

// ---------------------------------------------------------------
// Footer yılı otomatik güncelle
// ---------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------------------
// TEMA DEĞİŞTİRME (Karanlık / Aydınlık)
// ---------------------------------------------------------------
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ---------------------------------------------------------------
// DİL DEĞİŞTİRME (TR / EN)
// ---------------------------------------------------------------
const langToggle = document.getElementById('langToggle');
const savedLang = localStorage.getItem('lang') || 'tr';

function applyLanguage(lang) {
  document.querySelectorAll('[data-tr][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  document.documentElement.setAttribute('lang', lang === 'tr' ? 'tr' : 'en');
  if (langToggle) langToggle.textContent = lang === 'tr' ? 'TR' : 'EN';
}

applyLanguage(savedLang);

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('lang') === 'tr' ? 'tr' : 'en';
    const next = current === 'tr' ? 'en' : 'tr';
    localStorage.setItem('lang', next);
    applyLanguage(next);
  });
}

// ---------------------------------------------------------------
// ARKA PLAN PARÇACIK ANİMASYONU
// ---------------------------------------------------------------
const canvas = document.getElementById('bgCanvas');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = Math.floor((canvas.width * canvas.height) / 15000);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#7C9EFF';
      ctx.fill();
    });

    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(124, 158, 255, ${1 - dist / 120})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }

  draw();
}