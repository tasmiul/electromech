/* Featured customer carousel */
(function () {
  "use strict";
  var prevBtn = document.getElementById("carousel-prev");
  var nextBtn = document.getElementById("carousel-next");
  var strip = document.getElementById("featured-carousel-strip");
  if (!prevBtn || !nextBtn || !strip) return;
  prevBtn.addEventListener("click", function () {
    strip.scrollBy({ left: -220, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", function () {
    strip.scrollBy({ left: 220, behavior: "smooth" });
  });
})();
