const menuToggle = document.querySelector('[data-menu-toggle]');
const navLinks = document.querySelector('[data-nav-links]');
const toast = document.querySelector('[data-toast]');
const backToTop = document.querySelector('[data-back-to-top]');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('[data-close-menu]').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const closeLightbox = () => lightbox.classList.remove('open');

document.querySelectorAll('[data-image]').forEach((item) => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.dataset.alt;
  lightbox.classList.add('open');
  showToast(`Viewing the ${item.dataset.alt.toLowerCase()}`);
}));
document.querySelector('[data-lightbox-close]').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeLightbox(); });

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const messageField = document.querySelector('[name="message"]');
const characterCount = document.querySelector('[data-character-count]');
messageField.addEventListener('input', () => { characterCount.textContent = `${messageField.value.length}/250`; });
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelectorAll('a[href="#contact"]').forEach((link) => link.addEventListener('click', () => showToast('The enquiry form is ready for you.')));

document.querySelector('[data-enquiry-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  status.textContent = 'Thank you. The school office will contact you soon.';
  showToast('Your enquiry was submitted successfully.');
  form.reset();
  characterCount.textContent = '0/250';
});
