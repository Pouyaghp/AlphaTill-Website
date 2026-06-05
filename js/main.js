// Mobile nav toggle
document.addEventListener('click', function (e) {
  if (e.target.closest('.menu-toggle')) {
    document.querySelector('.nav-links').classList.toggle('open');
  }
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Scroll-scrubbed brand reveal (home page)
const brand = document.getElementById('brandReveal');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (brand && !reduce) {
  const wrap  = brand.querySelector('.brand-logo-wrap');
  const shine = brand.querySelector('.brand-shine');
  const tag   = brand.querySelector('.brand-tag');
  const cue   = brand.querySelector('.brand-scrollcue');
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  let ticking = false;

  function update() {
    const rect = brand.getBoundingClientRect();
    const total = brand.offsetHeight - window.innerHeight;
    let p = total > 0 ? (-rect.top) / total : 0;
    p = Math.min(1, Math.max(0, p));
    const e = easeOutCubic(p);

    // Logo: visible from the top, gently settles & sharpens
    const scale = 1.12 - 0.12 * e;
    const blur  = (1 - e) * 2;
    const op    = Math.min(1, 0.85 + e);
    wrap.style.transform = 'scale(' + scale.toFixed(3) + ')';
    wrap.style.filter    = 'blur(' + blur.toFixed(2) + 'px)';
    wrap.style.opacity   = op.toFixed(3);

    // Gold light sweep across the mark
    shine.style.opacity = (p > 0.04 && p < 0.96) ? '1' : '0';
    shine.style.backgroundPosition = (120 - p * 240).toFixed(1) + '% 0';

    // Tagline fans in during the second half
    const t2 = Math.min(1, Math.max(0, (p - 0.5) / 0.4));
    tag.style.opacity = t2.toFixed(3);
    tag.style.letterSpacing = (16 - t2 * 4).toFixed(1) + 'px';

    // Fade the scroll cue as the animation plays
    if (cue) cue.style.opacity = Math.max(0, 1 - p * 3).toFixed(2);

    ticking = false;
  }
  function onScroll() { if (!ticking) { requestAnimationFrame(update); ticking = true; } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Contact form (front-end only demo)
const form = document.getElementById('demo-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ok = document.getElementById('form-ok');
    form.style.display = 'none';
    if (ok) ok.style.display = 'block';
  });
}
