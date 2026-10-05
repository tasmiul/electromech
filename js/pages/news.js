/* Press archive filters */
(function () {
  "use strict";
  var container = document.getElementById("press-filter-container");
  var cards = document.querySelectorAll(".archive-card");
  if (!container || !cards.length) return;

  var buttons = container.querySelectorAll(".filter-btn");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.classList.remove("bg-primary-container", "text-on-primary-container", "active");
        b.classList.add("bg-surface-container", "text-on-surface-variant");
        var dot = b.querySelector(".rounded-full");
        if (dot) dot.remove();
      });
      btn.classList.remove("bg-surface-container", "text-on-surface-variant");
      btn.classList.add("bg-primary-container", "text-on-primary-container", "active");
      if (!btn.querySelector(".rounded-full")) {
        var newDot = document.createElement("span");
        newDot.className = "w-1.5 h-1.5 rounded-full bg-on-primary-container";
        btn.prepend(newDot);
      }
      cards.forEach(function (card) {
        var categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.indexOf(filter) !== -1) {
          card.style.display = "flex";
          card.style.opacity = "1";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();
