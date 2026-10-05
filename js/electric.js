/* ============================================================
   ELECTRIC — hero SVG current, pause off-screen / hidden / mobile
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (reduceMotion) return;

  var hero = document.querySelector('main section[class*="min-h-[92vh]"]');
  if (hero) hero.classList.add("section-spark");

  if (hero) {
    var overlay = document.createElement("div");
    overlay.className = "electric-hero";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<svg viewBox="0 0 1440 720" preserveAspectRatio="none" focusable="false">' +
      '<path class="arc" d="M0 140 C 180 80, 280 220, 460 160 S 760 40, 980 180 S 1280 80, 1440 150"/>' +
      '<path class="arc arc-soft" d="M0 420 C 220 360, 340 520, 560 440 S 860 300, 1100 460 S 1320 380, 1440 430"/>' +
      '<path class="arc" d="M80 620 C 260 560, 400 680, 620 600 S 980 520, 1200 640"/>' +
      '<circle class="glow-dot" cx="220" cy="128" r="3"/>' +
      '<circle class="glow-dot" cx="760" cy="90" r="2.5"/>' +
      '<circle class="glow-dot" cx="1180" cy="170" r="3"/>' +
      '<circle class="glow-dot" cx="540" cy="448" r="2.5"/>' +
      "</svg>";

    var flash = document.createElement("div");
    flash.className = "lightning-overlay";
    flash.setAttribute("aria-hidden", "true");

    hero.appendChild(overlay);
    if (!isMobile) hero.appendChild(flash);

    function setPaused(paused) {
      overlay.style.animationPlayState = paused ? "paused" : "running";
      overlay.querySelectorAll(".arc, .glow-dot").forEach(function (el) {
        el.style.animationPlayState = paused ? "paused" : "running";
      });
      if (flash.parentNode) {
        flash.style.animationPlayState = paused ? "paused" : "running";
      }
    }

    document.addEventListener("visibilitychange", function () {
      setPaused(document.hidden);
    });

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            setPaused(!entry.isIntersecting || document.hidden);
          });
        },
        { threshold: 0.05 }
      );
      io.observe(hero);
    }
  }

  document.querySelectorAll(".btn-pulse").forEach(function (btn) {
    btn.classList.add("electric-ready");
  });

  document.querySelectorAll("main h2, main .page-kicker").forEach(function (el, i) {
    if (i % 2 === 0) {
      var block = el.closest("section");
      if (block) block.classList.add("section-spark");
    }
  });
})();
