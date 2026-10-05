/* Company history facility slider */
(function () {
  "use strict";
  var slides = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8g3Imrga7PY4mSQMKnOHKM3786_dOfH1mtJ8jdnFl7rz1IYb84vTp5mm4ZovYNRhzcHjwYmBWGU1wIhGnAWumTNMaxINkqDoLKF6EFVKcp94M3oYXmLRsXBf6oE6Ii_ETYrxeJMK9seUTmmhCA89arlpdWDL58bv1Q8kdkLchFnRK87IvrpdNHhtx4XoXF0Efm5pZK4bNJHeJLiH2I2NG8tYfMbexZ009avblAo6s4vYf2Xk8S4s",
      caption: "PRECISION ELECTRICAL MANUFACTURING & ASSEMBLY BAY",
      indexText: "// FACILITY VIEW 01/02"
    },
    {
      src: "https://lh3.googleusercontent.com/aida/AEtjO1XFGvRIg9rgZ9aLY8x7-ZmujsBoqG5h49HH1b18jiUJCM_hQ-4C7ghIHZReJ6ix_y16fgIQJKRM6U4Vt4kh-nOOLZ_GRWP4gWx7DulAONhg6VE420tj784Hzlecm-cvCX9BLvbv5CtRoSOxzd5buDynqbJ-y_t28bqyhxqjTwnr7WklLrQC6GGNKL8U0r5TSCQetPpdSNvasaMlobvWHdY1CRlg8q1EAZpq-yZdL7YzFGQn9nHKjJdx",
      caption: "MEDIUM VOLTAGE SWITCHGEAR & AUTOMATION WORKSHOP",
      indexText: "// FACILITY VIEW 02/02"
    }
  ];

  var current = 0;
  var imgEl = document.getElementById("who-we-are-slide-img");
  var captionEl = document.getElementById("slider-caption-text");
  var prevBtn = document.getElementById("slider-prev-btn");
  var nextBtn = document.getElementById("slider-next-btn");
  var dot0 = document.getElementById("dot-0");
  var dot1 = document.getElementById("dot-1");
  if (!imgEl) return;

  function updateSlide(idx) {
    imgEl.style.opacity = "0";
    window.setTimeout(function () {
      imgEl.src = slides[idx].src;
      if (captionEl) captionEl.textContent = slides[idx].caption;
      imgEl.style.opacity = "1";
    }, 200);
    if (dot0 && dot1) {
      if (idx === 0) {
        dot0.className = "w-6 h-1 bg-primary";
        dot1.className = "w-2 h-1 bg-surface-variant";
      } else {
        dot0.className = "w-2 h-1 bg-surface-variant";
        dot1.className = "w-6 h-1 bg-primary";
      }
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      current = current === 0 ? slides.length - 1 : current - 1;
      updateSlide(current);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      current = current === slides.length - 1 ? 0 : current + 1;
      updateSlide(current);
    });
  }
})();
