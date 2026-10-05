/* Why Choose Us capability accordion */
(function () {
  "use strict";
  var container = document.getElementById("capability-accordion");
  if (!container) return;
  var items = container.querySelectorAll(".accordion-item");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setContentExpanded(content, expanded) {
    var wasHidden = content.classList.contains("hidden");
    var startHeight = wasHidden ? 0 : content.getBoundingClientRect().height;
    var startOpacity = wasHidden ? 0 : Number.parseFloat(getComputedStyle(content).opacity);

    if (content._accordionAnimation) content._accordionAnimation.cancel();
    content.style.height = "";
    content.style.opacity = "";
    content.style.overflow = "";

    if (expanded) content.classList.remove("hidden");
    if (reduceMotion) {
      content.classList.toggle("hidden", !expanded);
      return;
    }

    content.style.overflow = "hidden";
    var animation = content.animate(
      [
        { height: startHeight + "px", opacity: startOpacity },
        { height: (expanded ? content.scrollHeight : 0) + "px", opacity: expanded ? 1 : 0 }
      ],
      { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
    );
    content._accordionAnimation = animation;
    animation.onfinish = function () {
      if (content._accordionAnimation !== animation) return;
      content.classList.toggle("hidden", !expanded);
      content.style.height = "";
      content.style.opacity = "";
      content.style.overflow = "";
      content._accordionAnimation = null;
    };
  }

  items.forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var content = item.querySelector(".accordion-content");
    var icon = item.querySelector(".accordion-icon");
    if (!trigger || !content) return;
    var indexNumber = trigger.querySelector(".font-tech-data");
    var startsOpen = trigger.getAttribute("aria-expanded") === "true";
    content.classList.toggle("hidden", !startsOpen);
    if (icon) icon.classList.toggle("rotate-180", startsOpen);

    trigger.addEventListener("click", function () {
      var isExpanded = trigger.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        setContentExpanded(content, false);
        if (icon) icon.classList.remove("rotate-180");
        if (indexNumber && item.dataset.index !== "01" && item.dataset.index !== "04") {
          indexNumber.classList.remove("text-primary");
          indexNumber.classList.add("text-outline");
        }
      } else {
        trigger.setAttribute("aria-expanded", "true");
        setContentExpanded(content, true);
        if (icon) icon.classList.add("rotate-180");
        if (indexNumber) {
          indexNumber.classList.remove("text-outline");
          indexNumber.classList.add("text-primary");
        }
      }
    });
  });
})();
