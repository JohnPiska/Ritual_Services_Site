document.addEventListener("DOMContentLoaded", function () {
  // ======== ФИКС ШАПКИ ПРИ СКРОЛЛЕ =========
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ======== МОДАЛЬНОЕ ОКНО (КОНСУЛЬТАЦИЯ) =========
  const openModalBtn = document.getElementById("open-modal"); // кнопка консультации
  const modal = document.getElementById("contact-modal");
  const overlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("modal-close");

  if (openModalBtn && modal && overlay) {
    openModalBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("active");
      overlay.classList.add("active");
    });

    closeModalBtn.addEventListener("click", function () {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    });

    overlay.addEventListener("click", function () {
      modal.classList.remove("active");
      overlay.classList.remove("active");
    });
  }

  // ======== ШТОРКА "Что делать..." =========
  const openGuideBtn = document.getElementById("open-guide"); // кнопка шторки
  const guideDrop = document.getElementById("guide-drop");

  if (openGuideBtn && guideDrop) {
    openGuideBtn.addEventListener("click", function () {
      guideDrop.classList.toggle("open");

      // Меняем текст кнопки при открытии/закрытии
      if (guideDrop.classList.contains("open")) {
        openGuideBtn.textContent = "Скрыть инструкцию ▲";
      } else {
        openGuideBtn.textContent = "Что делать, если умер близкий человек? ▼";
      }

      console.log("Шторка переключена:", guideDrop.classList.contains("open"));
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

function toggleMenu() {
  mobileMenu.classList.toggle("show");
}

// Открытие/закрытие при клике на бургер
burger.addEventListener("click", (e) => {
  e.stopPropagation(); // чтобы клик не улетал в document
  toggleMenu();
});

// Закрытие при клике на пункт меню
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("show");
  });
});

// Закрытие при клике вне меню и вне бургера
document.addEventListener("click", (e) => {
  if (
    mobileMenu.classList.contains("show") && 
    !mobileMenu.contains(e.target) && 
    !burger.contains(e.target)
  ) {
    mobileMenu.classList.remove("show");
  }
});

