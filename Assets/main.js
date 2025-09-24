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

document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");
  if (!newsContainer) return; // чтобы не ломалось на других страницах

  const modal = document.getElementById("news-modal");
  const closeModal = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImage = document.getElementById("modal-image");
  const modalContent = document.getElementById("modal-content");

  fetch("news.json")
    .then(response => response.json())
    .then(newsList => {
      newsList.forEach(news => {
        const card = document.createElement("div");
        card.classList.add("news-card");

        card.innerHTML = `
          <img src="${news.image}" alt="${news.title}">
          <h3>${news.title}</h3>
          <p>${news.description}</p>
        `;

        card.addEventListener("click", () => {
          modalTitle.textContent = news.title;
          modalImage.src = news.image;
          modalContent.textContent = news.content;
          modal.style.display = "block";
        });

        newsContainer.appendChild(card);
      });
    });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.getElementById("news-carousel-track");
  if (!carouselTrack) return;

  fetch("Новости/news.json") // путь к JSON
    .then(res => res.json())
    .then(newsList => {
      newsList.forEach(news => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <a href="news-detail.html?id=${news.id}" class="news-link">
              <img src="Новости/${news.image}" alt="${news.title}">
              <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
              </div>
            </a>
          `;
      });
    });

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentIndex = 0;

  function updateCarousel() {
    const cardWidth = document.querySelector(".news-card").offsetWidth + 20;
    carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < carouselTrack.children.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  fetch("news.json")
    .then(res => res.json())
    .then(newsList => {
      const news = newsList.find(n => n.id == id);
      if (!news) {
        document.querySelector(".news-detail").innerHTML = "<p>Новость не найдена</p>";
        return;
      }

      document.getElementById("news-title").textContent = news.title;
      document.getElementById("news-image").src = "Новости/" + news.image;
      document.getElementById("news-image").alt = news.title;
      document.getElementById("news-content").textContent = news.fullText;
    })
    .catch(() => {
      document.querySelector(".news-detail").innerHTML = "<p>Ошибка загрузки новости</p>";
    });
});

