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
// Scroll ile aktif sekmeyi güncelle
// ---------------------------------------------------------------
const sections = document.querySelectorAll('.section');
const tabs = document.querySelectorAll('.tab');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      tabs.forEach(tab => {
        tab.classList.toggle('is-active', tab.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

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

// ---------------------------------------------------------------
// Footer yılı otomatik güncelle
// ---------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();