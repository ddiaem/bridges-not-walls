/* ═══════════════════════════════════════
   BRIDGES, NOT WALLS — main.js
═══════════════════════════════════════ */

/* ── Site visits & brochure downloads counters (stored per-browser) ── */
(function () {
  const VISITS_BASE = 500;
  const DOWNLOADS_BASE = 36;

  function readCount(key, base) {
    const stored = localStorage.getItem(key);
    const n = stored === null ? base : parseInt(stored, 10);
    return Number.isFinite(n) ? n : base;
  }

  // Count this page load as a new visit (once per browser session).
  let visits = readCount('bnw_site_visits', VISITS_BASE);
  if (!sessionStorage.getItem('bnw_visit_counted')) {
    visits += 1;
    localStorage.setItem('bnw_site_visits', String(visits));
    sessionStorage.setItem('bnw_visit_counted', '1');
  }

  const downloads = readCount('bnw_brochure_downloads', DOWNLOADS_BASE);
  localStorage.setItem('bnw_brochure_downloads', String(downloads));

  const visitsEl = document.getElementById('statSiteVisits');
  if (visitsEl) visitsEl.dataset.target = String(visits);

  const downloadsEl = document.getElementById('statBrochureDownloads');
  if (downloadsEl) downloadsEl.dataset.target = String(downloads);

  // Increment the brochure counter whenever the brochure download link is clicked.
  const brochureLink = document.querySelector('a[href$="brochure.pdf"]');
  if (brochureLink) {
    brochureLink.addEventListener('click', function () {
      const current = readCount('bnw_brochure_downloads', DOWNLOADS_BASE) + 1;
      localStorage.setItem('bnw_brochure_downloads', String(current));
      if (downloadsEl) {
        downloadsEl.dataset.target = String(current);
        downloadsEl.textContent = String(current);
      }
    });
  }
})();

/* ── Animated counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + (progress === 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('.stat-number');
if (counters.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .4 });
  counters.forEach(c => observer.observe(c));
}

/* ── Scroll-reveal fade-in ── */
const revealEls = document.querySelectorAll('.info-card, .activity-card, .topic-item, .tl-item, .download-card, .stat');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

revealEls.forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .5s ease ${i * 0.04}s, transform .5s ease ${i * 0.04}s`;
  revealObserver.observe(el);
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${section.id}`
          ? 'rgba(255,255,255,1)'
          : 'rgba(255,255,255,.7)';
      });
    }
  });
}, { passive: true });
