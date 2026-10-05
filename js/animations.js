/* ============================================================
   ANIMATIONS — scroll progress, navbar state, IO reveal, counters
   GPU-only motion; once-only reveals; rAF + passive listeners
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var progressBar = document.querySelector(".scroll-progress");
  var header = document.querySelector(".site-header");

  function updateProgress() {
    if (!progressBar) return;
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.transform = "scaleX(" + (progress / 100) + ")";
  }

  if (progressBar) {
    progressBar.style.transformOrigin = "left center";
    progressBar.style.width = "100%";
    progressBar.style.transform = "scaleX(0)";
    progressBar.classList.add("electric");
  }

  function updateNavbar() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateProgress();
      updateNavbar();
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateProgress();
  updateNavbar();

  function markVisible(el) {
    el.classList.add("visible");
  }

  var fold = window.innerHeight * 0.92;
  var sections = document.querySelectorAll("main section");
  sections.forEach(function (section, index) {
    if (index === 0) {
      section.classList.remove("reveal");
      section.classList.add("visible");
      return;
    }
    var parentSection = section.parentElement && section.parentElement.closest("section");
    if (parentSection || section.classList.contains("sticky")) return;
    if (section.getBoundingClientRect().top < fold) {
      section.classList.add("visible");
      return;
    }
    section.classList.add("reveal");
  });

  var cardSelector = ".cat-card, .gallery-card, .project-item, .solution-card, .cert-card, .archive-card";
  document.querySelectorAll(cardSelector).forEach(function (card, i) {
    var section = card.closest("section");
    if (section && !section.classList.contains("reveal")) return;
    var rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return;
    card.classList.add("reveal");
    card.setAttribute("data-delay", String((i % 6) + 1));
  });

  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach(markVisible);
  } else if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(markVisible);
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (String(target).split(".")[1] || "").length;
    var duration = reduceMotion ? 0 : 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = duration === 0 ? 1 : Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (el.hasAttribute("data-final")) {
        el.textContent = el.getAttribute("data-final");
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll("[data-count]").forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  document.querySelectorAll("[data-back-to-top]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (typeof window.emCloseMenu === "function") window.emCloseMenu();
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var buttons = group.querySelectorAll("[data-filter]");
    var gridId = group.getAttribute("data-filter-group");
    var grid = document.getElementById(gridId);
    if (!grid) return;
    var items = grid.querySelectorAll("[data-categories]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.classList.remove("bg-primary-container", "text-white", "text-on-primary-container", "active");
          b.classList.add("bg-surface-container", "text-on-surface-variant");
        });
        btn.classList.remove("bg-surface-container", "text-on-surface-variant");
        btn.classList.add("bg-primary-container", "text-on-primary-container", "active");
        items.forEach(function (item) {
          var cats = item.getAttribute("data-categories") || "";
          item.style.display = filter === "all" || cats.indexOf(filter) !== -1 ? "" : "none";
        });
      });
    });
  });

  var inquiryForm = document.querySelector("#contact form, form.space-y-4");
  if (inquiryForm && inquiryForm.querySelector('button[type="submit"]')) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      window.alert("Inquiry received. An ElectroMech representative will contact you shortly.");
    });
  }
})();
