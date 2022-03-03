$(document).ready(function () {
  // Активируем бургер
  var burger = document.querySelector(".burger");
  var close = document.querySelector(".icon-close");

  burger.addEventListener("click", function () {
    document
      .querySelector(".header-mobile")
      .classList.add("header-mobile--visible");
  });

  close.addEventListener("click", function () {
    document
      .querySelector(".header-mobile")
      .classList.remove("header-mobile--visible");
  });
});
