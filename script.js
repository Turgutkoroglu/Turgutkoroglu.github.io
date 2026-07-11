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
/*-------------------------------------------------------------------------------------------------------*/
// const ceviriler = {
//   tr: {
//     hero_title: "Bilgisayar Mühendisi",
//     hero_desc: "Karmaşık problemlere temiz, güvenli ve sürdürülebilir çözümler üretiyorum.",
//     btn_projects: "Projelerimi Gör",
//     btn_dil: "EN" // TR modundayken buton EN göstersin
//   },
//   en: {
//     hero_title: "Computer Engineer",
//     hero_desc: "I create clean, secure, and sustainable solutions to complex problems.",
//     btn_projects: "View My Projects",
//     btn_dil: "TR" // EN modundayken buton TR göstersin
//   }
// };

// // Tarayıcı hafızasına bak, dil yoksa varsayılan olarak 'tr' yap
// let current_lang = localStorage.getItem('lang') || 'tr';

// // Dili değiştiren ana fonksiyon
// function setLang(lang) {
//   current_lang = lang;
//   localStorage.setItem('lang', lang); // Hafızaya kaydet
  
//   // Butonun üzerindeki yazıyı güncelle
//   document.getElementById('lang-button').innerText = ceviriler[lang].btn_dil;

//   // data-i18n etiketine sahip TÜM elemanları bul ve metinlerini değiştir
//   const willChangeItems = document.querySelectorAll('[data-i18n]');
  
//   willChangeItems.forEach(eleman => {
//     const key = eleman.getAttribute('data-i18n'); // örn: "hero_title"
//     eleman.innerText = ceviriler[lang][key]; // Sözlükten karşılığını bul ve yaz
//   });
// }

// // Butona tıklandığında dili değiştir
// document.getElementById('lang-button').addEventListener('click', () => {
//   const newLang = current_lang === 'tr' ? 'en' : 'tr';
//   setLang(newLang);
// });

// // Sayfa ilk yüklendiğinde hafızadaki dili uygula
// setLang(current_lang);