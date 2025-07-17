document.addEventListener("DOMContentLoaded", function () {
  // ======== ФИКС ШАПКИ ПРИ СКРОЛЛЕ =========
  const header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ======== МОДАЛЬНОЕ ОКНО (КОНСУЛЬТАЦИЯ) =========
  const openModalBtn = document.getElementById('open-modal'); // кнопка консультации
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

  // ======== ШТОРКА "Что делать..." =========
  const openGuideBtn = document.getElementById('open-guide'); // кнопка шторки
  const guideDrop = document.getElementById('guide-drop');

  if (openGuideBtn && guideDrop) {
    openGuideBtn.addEventListener('click', function () {
      guideDrop.classList.toggle('open');

      // Меняем текст кнопки при открытии/закрытии
      if (guideDrop.classList.contains('open')) {
        openGuideBtn.textContent = "Скрыть инструкцию ▲";
      } else {
        openGuideBtn.textContent = "Что делать, если умер близкий человек? ▼";
      }

      console.log('Шторка переключена:', guideDrop.classList.contains('open'));
    });
  }
});
