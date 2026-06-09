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

// Scroll-scrubbed brand intro video (home page)
const brand = document.getElementById('brandReveal');
const introVideo = document.getElementById('introVideo');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (brand && introVideo && !reduce) {
  const cue = brand.querySelector('.brand-scrollcue');
  let dur = 0, ready = false, ticking = false, primed = false;

  function markReady() { dur = introVideo.duration || 0; if (dur) { ready = true; update(); } }
  introVideo.addEventListener('loadedmetadata', markReady);
  if (introVideo.readyState >= 1) markReady();

  // iOS/Safari: prime a paused video so scrubbed frames actually render
  function prime() {
    if (primed) return; primed = true;
    const pr = introVideo.play();
    if (pr && pr.then) pr.then(function () { introVideo.pause(); }).catch(function () {});
    else { try { introVideo.pause(); } catch (e) {} }
  }
  window.addEventListener('touchstart', prime, { passive: true, once: true });
  window.addEventListener('scroll', prime, { passive: true, once: true });

  function progress() {
    const rect = brand.getBoundingClientRect();
    const total = brand.offsetHeight - window.innerHeight;
    let p = total > 0 ? (-rect.top) / total : 0;
    return Math.min(1, Math.max(0, p));
  }
  function update() {
    const p = progress();
    if (ready && dur) {
      const t = p * (dur - 0.05);
      if (Math.abs(introVideo.currentTime - t) > 0.01) {
        try { introVideo.currentTime = t; } catch (e) {}
      }
    }
    if (cue) cue.style.opacity = Math.max(0, 1 - p * 4).toFixed(2);
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
