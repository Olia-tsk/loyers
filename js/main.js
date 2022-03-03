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

  // модальное окно
  var modalButton = $("[data-toggle=modal]");
  var modalCloseBtn = $(".modal-close");
  var modalWindow = $(".modal");
  var modalOverlay = $(".overlay");
  var body = $("body");

  // закрыть модальное окно на esc
  $(document).on("keydown", function (e) {
    if (e.keyCode == 27) var modalOverlay = $(".overlay");
    var modalWindow = $(".modal");
    modalOverlay.removeClass("overlay--show");
    modalWindow.removeClass("modal--active");
    body.removeClass("overflow");
  });

  // закрыть модальное окно по щелчку вне окна
  $(document).click(function (e) {
    if (
      !modalButton.is(e.target) &&
      modalWindow.is(e.target) &&
      modalWindow.has(e.target).length === 0
    ) {
      modalOverlay.removeClass("overlay--show");
      modalWindow.removeClass("modal--active");
      body.removeClass("overflow");
    }
  });

  function openModal() {
    modalOverlay.addClass("overlay--show");
    modalWindow.addClass("modal--active");
    body.addClass("overflow");
  }

  function closeModal(event) {
    event.preventDefault();
    modalOverlay.removeClass("overlay--show");
    modalWindow.removeClass("modal--active");
    body.removeClass("overflow");
  }

  modalButton.on("click", openModal);
  modalCloseBtn.on("click", closeModal);
});
