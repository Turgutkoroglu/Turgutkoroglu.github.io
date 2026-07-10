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
const roles = ['Junior Computer Engineer', 'Web Developer', 'Software Enthusiast', 'Tech Explorer', 'Problem Solver', 'Innovative Thinker', 'Continuous Learner', 'Team Player', 'Creative Coder', 'Passionate Programmer'];
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

// const type1 = document.getElementById('type1');
// let roleIndex1 = 0;
// let charIndex1 = 0;

// function typeLoop1() {
//   const current = roles[roleIndex1];

//   if (true) {
//     charIndex1++;
//     type1.textContent = current.slice(0, charIndex1);
//     if (charIndex1 === current.length) {
//       deleting = true;
//       setTimeout(typeLoop1, 1400);
//       return;
//     }
//   } else {
//     charIndex1--;
//     type1.textContent = current.slice(0, charIndex1);
//     if (charIndex1 === 0) {
//       deleting = false;
//       roleIndex1 = (roleIndex1 + 1) % roles.length;
//     }
//   }
// }

// const type2 = document.getElementById('type2');
// let roleIndex2 = 0;
// let charIndex2 = 0;

// function typeLoop2() {
//   const current = roles[roleIndex2];

//   if (true) {
//     charIndex2++;
//     type1.textContent = current.slice(0, charIndex2);
//     if (charIndex2 === current.length) {
//       deleting = true;
//       setTimeout(typeLoop2, 1400);
//       return;
//     }
//   } else {
//     charIndex2--;
//     type1.textContent = current.slice(0, charIndex2);
//     if (charIndex2 === 0) {
//       deleting = false;
//       roleIndex2 = (roleIndex2 + 1) % roles.length;
//     }
//   }
// }

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
if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '🌙' : '☀️';
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
  if (langToggle) langToggle.textContent = lang === 'tr' ? 'EN' : 'TR';
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