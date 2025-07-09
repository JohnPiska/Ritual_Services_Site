window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('open-guide');
  const guide = document.getElementById('guide-drop');

  if (toggleBtn && guide) {
    toggleBtn.addEventListener('click', () => {
      guide.classList.toggle('open');
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.querySelector('.btn[href="contacts.html"]'); 
  const modal = document.getElementById('contact-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.getElementById('modal-close');

  if (openModalBtn && modal && overlay) {
    openModalBtn.addEventListener('click', function (e) {
      e.preventDefault(); 
      modal.classList.add('active');
      overlay.classList.add('active');
    });

    closeModalBtn.addEventListener('click', function () {
      modal.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function () {
      modal.classList.remove('active');
      overlay.classList.remove('active');
    });
  }
});

