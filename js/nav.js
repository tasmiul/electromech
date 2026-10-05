/* ============================================================
   NAV — mobile drawer, about submenu, desktop touch dropdown
   ============================================================ */
(function () {
  "use strict";

  var menuToggle = document.getElementById("mobile-menu-toggle");
  var menuDrawer = document.getElementById("mobile-nav-drawer");
  var menuIcon = menuToggle ? menuToggle.querySelector(".material-symbols-outlined") : null;

  function openMenu() {
    if (!menuDrawer || !menuToggle) return;
    menuDrawer.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    if (menuIcon) menuIcon.textContent = "close";
  }

  function closeMenu() {
    if (!menuDrawer || !menuToggle) return;
    menuDrawer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    if (menuIcon) menuIcon.textContent = "menu";
  }

  function toggleMenu() {
    if (menuDrawer && menuDrawer.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  window.emCloseMenu = closeMenu;

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu();
    });
  }

  if (menuDrawer) {
    menuDrawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuDrawer && menuDrawer.classList.contains("open")) {
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  var aboutToggle = document.getElementById("mobile-about-toggle");
  var aboutSubmenu = document.getElementById("mobile-about-submenu");

  if (aboutToggle && aboutSubmenu) {
    aboutToggle.addEventListener("click", function (e) {
      e.preventDefault();
      var isOpen = aboutSubmenu.classList.contains("open");
      aboutSubmenu.classList.toggle("open");
      aboutToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      var chevron = aboutToggle.querySelector(".material-symbols-outlined");
      if (chevron) {
        chevron.style.transform = isOpen ? "" : "rotate(180deg)";
      }
    });
  }

  document.querySelectorAll(".nav-dropdown > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var parent = btn.closest(".nav-dropdown");
      if (!parent) return;
      var isOpen = parent.classList.contains("touch-open");
      document.querySelectorAll(".nav-dropdown.touch-open").forEach(function (d) {
        d.classList.remove("touch-open");
      });
      if (!isOpen) parent.classList.add("touch-open");
      e.stopPropagation();
    });
  });

  document.addEventListener("click", function () {
    document.querySelectorAll(".nav-dropdown.touch-open").forEach(function (d) {
      d.classList.remove("touch-open");
    });
  });
})();
