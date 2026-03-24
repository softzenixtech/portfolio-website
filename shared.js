/* shared.js — Softzenix Tech shared navigation & utilities */

/* ── NAV ACTIVE STATE ── */
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

/* ── STICKY NAV ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── HAMBURGER MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
let isDark = localStorage.getItem('theme') !== 'light';
applyTheme(isDark);
themeToggle?.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
function applyTheme(dark){
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  if(themeToggle) themeToggle.textContent = dark ? '🌙' : '☀️';
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revealObs.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── ANIMATED COUNTERS ── */
function animateCounter(el){
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1800;
  const start = performance.now();
  function tick(now){
    const t = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(ease * target) + suffix;
    if(t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.counters-grid').forEach(el => counterObs.observe(el));

/* ── FOOTER YEAR ── */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
