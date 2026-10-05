/* Gallery filters + lightbox */
(function () {
  "use strict";
  var filterButtons = document.querySelectorAll(".gallery-filter-btn");
  var galleryCards = document.querySelectorAll(".gallery-card");
  if (!galleryCards.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filterButtons.forEach(function (b) {
        b.classList.remove("bg-primary-container", "text-on-primary-container", "font-semibold");
        b.classList.add("text-on-surface-variant");
      });
      btn.classList.add("bg-primary-container", "text-on-primary-container", "font-semibold");
      btn.classList.remove("text-on-surface-variant");
      galleryCards.forEach(function (card) {
        var category = card.getAttribute("data-category");
        if (filter === "ALL" || category === filter) {
          card.style.display = "";
          card.classList.remove("opacity-0");
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  var lightbox = document.getElementById("gallery-lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxSpec = document.getElementById("lightbox-spec");
  var lightboxCategory = document.getElementById("lightbox-category");
  var lightboxIndex = document.getElementById("lightbox-index");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  if (!lightbox || !lightboxImg) return;

  var visibleCards = [];
  var currentIndex = 0;

  function updateVisibleCards() {
    visibleCards = Array.prototype.filter.call(galleryCards, function (c) {
      return c.style.display !== "none";
    });
  }

  function openLightbox(index) {
    updateVisibleCards();
    if (!visibleCards.length) return;
    currentIndex = index;
    var target = visibleCards[currentIndex];
    lightboxImg.src = target.getAttribute("data-img");
    if (lightboxTitle) lightboxTitle.textContent = target.getAttribute("data-title");
    if (lightboxSpec) lightboxSpec.textContent = target.getAttribute("data-spec");
    if (lightboxCategory) lightboxCategory.textContent = target.getAttribute("data-category");
    if (lightboxIndex) {
      lightboxIndex.textContent =
        "SPECIMEN VIEW // 0" + (currentIndex + 1) + " OF " +
        (visibleCards.length < 10 ? "0" : "") + visibleCards.length;
    }
    lightbox.classList.remove("opacity-0", "pointer-events-none");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "";
  }

  function nextImage() {
    updateVisibleCards();
    currentIndex = (currentIndex + 1) % visibleCards.length;
    openLightbox(currentIndex);
  }

  function prevImage() {
    updateVisibleCards();
    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    openLightbox(currentIndex);
  }

  galleryCards.forEach(function (card) {
    card.addEventListener("click", function () {
      updateVisibleCards();
      var idx = visibleCards.indexOf(card);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) {
    lightboxNext.addEventListener("click", function (e) {
      e.stopPropagation();
      nextImage();
    });
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      prevImage();
    });
  }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.id === "gallery-lightbox") closeLightbox();
  });
  window.addEventListener("keydown", function (e) {
    if (lightbox.classList.contains("pointer-events-none")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
})();
