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

//========= Новости ============
// Assets/main.js
document.addEventListener("DOMContentLoaded", () => {
  const newsJsonPath = "news.json";
  const newsContainer = document.getElementById("news-container");
  const modal = document.getElementById("news-modal");
  const closeBtn = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalText = document.getElementById("modal-text");

  // Функция открытия модального окна
  function openModal(newsItem) {
    if (!modal || !modalTitle) {
      console.error("Модальное окно не найдено");
      return;
    }
    
    // Заполняем модальное окно данными
    modalTitle.textContent = newsItem.title || "Заголовок отсутствует";
    modalImage.src = newsItem.image || "";
    modalImage.alt = newsItem.title || "";
    
    // Если нет контента, используем заглушку
    const content = newsItem.content || newsItem.description || "Подробная информация будет добавлена позже.";
    modalText.textContent = content;
    
    // Показываем модальное окно
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    
    console.log("Модальное окно открыто:", newsItem.title);
  }

  // Функция закрытия модального окна
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Инициализация обработчиков событий
  function initModalHandlers() {
    // Закрытие по клику на фон
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Закрытие по кнопке
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    // Закрытие по Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // Загрузка и отображение новостей
  function loadNews() {
    fetch(newsJsonPath)
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
        return res.json();
      })
      .then(newsList => {
        console.log("Загружено новостей:", newsList.length);
        renderNewsCards(newsList);
      })
      .catch(err => {
        console.error("Ошибка загрузки новостей:", err);
        showError();
      });
  }

  // Рендеринг карточек новостей
  function renderNewsCards(newsList) {
    if (!newsContainer) {
      console.error("Контейнер новостей не найден");
      return;
    }

    newsContainer.innerHTML = ""; // Очищаем контейнер

    if (newsList.length === 0) {
      newsContainer.innerHTML = '<p>Новости отсутствуют</p>';
      return;
    }

    newsList.forEach(item => {
      const card = document.createElement("div");
      card.className = "news-card";
      
      // Если нет описания, используем заглушку
      const description = item.description || "Нажмите для просмотра подробной информации";
      
      card.innerHTML = `
        <img src="${item.image || ''}" alt="${item.title || ''}" onerror="this.style.display='none'">
        <div class="news-content">
          <h3>${item.title || 'Без названия'}</h3>
          <p>${description}</p>
        </div>
      `;
      
      // Открываем модальное окно при клике на карточку
      card.addEventListener("click", () => {
        console.log("Клик по карточке:", item.title);
        openModal(item);
      });
      
      newsContainer.appendChild(card);
    });
  }

  // Показать сообщение об ошибке
  function showError() {
    if (newsContainer) {
      newsContainer.innerHTML = `
        <div class="error-message">
          <p>Ошибка загрузки новостей. Пожалуйста, попробуйте позже.</p>
        </div>
      `;
    }
  }

  // Запуск всех функций
  initModalHandlers();
  loadNews();
  
  console.log("Скрипт новостей инициализирован");
});