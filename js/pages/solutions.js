/* Solutions category filter */
(function () {
  "use strict";
  var filterButtons = document.querySelectorAll("#solution-filter-tabs .filter-btn");
  var cards = document.querySelectorAll(".solution-card");
  if (!filterButtons.length || !cards.length) return;

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active", "bg-primary-container", "text-white");
        btn.classList.add("bg-surface-container", "text-tertiary", "border", "border-surface-container-highest");
      });
      button.classList.add("active", "bg-primary-container", "text-white");
      button.classList.remove("bg-surface-container", "text-tertiary", "border", "border-surface-container-highest");
      cards.forEach(function (card) {
        var cardCat = card.getAttribute("data-category");
        card.style.display = filter === "all" || cardCat === filter ? "flex" : "none";
      });
    });
  });
})();
