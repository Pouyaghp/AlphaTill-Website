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
