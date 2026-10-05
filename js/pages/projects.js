/* Projects sector filter */
(function () {
  "use strict";
  var filterBtns = document.querySelectorAll("#project-filters .filter-btn");
  var projectItems = document.querySelectorAll("#projects-grid .project-item");
  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filterValue = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        b.classList.remove("bg-primary-container", "text-on-primary-container", "shadow-sm");
        b.classList.add("bg-surface-container", "text-on-surface-variant");
      });
      btn.classList.add("bg-primary-container", "text-on-primary-container", "shadow-sm");
      btn.classList.remove("bg-surface-container", "text-on-surface-variant");
      projectItems.forEach(function (item) {
        var categories = item.getAttribute("data-categories") || "";
        item.style.display =
          filterValue === "all" || categories.indexOf(filterValue) !== -1 ? "flex" : "none";
      });
    });
  });
})();
