/* Products catalogue filter */
(function () {
  "use strict";
  var pills = document.querySelectorAll("#categoryNav .cat-pill");
  var cards = document.querySelectorAll("#catalogueGrid .cat-card");
  if (!pills.length || !cards.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      var filter = pill.getAttribute("data-filter");
      pills.forEach(function (p) {
        p.classList.remove("bg-primary-container", "text-white", "active");
        p.classList.add("bg-surface-container", "text-tertiary");
      });
      pill.classList.remove("bg-surface-container", "text-tertiary");
      pill.classList.add("bg-primary-container", "text-white", "active");
      cards.forEach(function (card) {
        var cardCategory = card.getAttribute("data-category");
        card.style.display = filter === "all" || cardCategory === filter ? "flex" : "none";
      });
    });
  });
})();
