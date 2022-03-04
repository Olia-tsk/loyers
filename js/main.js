$(document).ready(function () {
  // Активируем бургер
  var burger = document.querySelector(".burger");
  var mobileMenuClose = document.querySelector(".icon-close");
  var mobileMenu = document.querySelector(".header-mobile");

  burger.addEventListener("click", function () {
    document
      .querySelector(".header-mobile")
      .classList.add("header-mobile--visible");
    body.addClass("overflow");
  });

  mobileMenuClose.addEventListener("click", function () {
    document
      .querySelector(".header-mobile")
      .classList.remove("header-mobile--visible");
    body.removeClass("overflow");
  });

  // модальное окно
  var modalButton = $("[data-toggle=modal]");
  var modalCloseBtn = $(".modal-close");
  var modalWindow = $(".modal");
  var modalOverlay = $(".overlay");
  var body = $("body");

  // закрыть модальное окно на esc
  $(document).on("keydown", function (e) {
    if (e.keyCode == 27) {
      var modalOverlay = $(".overlay");
      var modalWindow = $(".modal");
      modalOverlay.removeClass("overlay--show");
      modalWindow.removeClass("modal--active");
      body.removeClass("overflow");
    }
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

  // кнопка прокрутки в начало страницы
  $(function () {
    // scroll to top
    $(".to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 500);
      return false;
    });

    //show to-top button
    $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > 900) {
        $(".to-top").addClass("to-top--visible");
      } else {
        $(".to-top").removeClass("to-top--visible");
      }
    });
  });

  // маска для формы с номером телефона
  let phoneInput = $("input[name=tel]");
  phoneInput.mask("+7 (000) 000-00-00");

  // Валидация форм
  $(".modal-form").each(function () {
    $(this).validate({
      rules: {
        tel: {
          required: true,
          minlength: 18,
        },
        email: {
          required: true,
          email: true,
        },
      },

      messages: {
        full_name: {
          required: "Укажите Ваше имя",
          minlength: "Имя должно быть длиннее 1 символа",
        },
        tel: {
          required: "Укажите Ваш номер телефона",
          minlength: jQuery.validator.format("Формат +7 (999) 999-99-99"),
        },
        email: {
          required: "Укажите почту, чтобы мы могли связаться с Вами",
          email: "Формат должен быть email@domain.ru",
        },
        confidentiality: {
          required: "Это поле является обязательным",
        },
        link: {
          required: "Это поле является обязательным",
        },
      },
    });
  });

  // замена данных в модальном окне после отправки
  $("#landingufw").on("submit", function (e) {
    e.preventDefault();
    if ($("#landingufw").valid()) {
      $.ajax({
        url: "/send.php",
        method: "post",
        data: $("#landingufw").serialize(),
      }).done(function (response) {
        $("#landingufw")
          .parent()
          .append(
            "<div class='response' style='text-align: center'>" +
              response +
              "</div>"
          );
        $(".modal-header").addClass("hide");
        $("#landingufw").fadeOut(400, function () {
          $("#landingufw").parent().find(".response").fadeIn();
        });
      });
    }
  });

  // $("#landingufw").on("submit", function (e) {
  //   e.preventDefault();
  //   if ($("#landingufw").valid()) {
  //     $.ajax({
  //       url: "/send.php",
  //       method: "post",
  //       data: $("#landingufw").serialize(),
  //     }).done(function (response) {
  //       $("#landingufw")
  //         .parent()
  //         .append(
  //           "<div class='response' style='text-align: center'>" +
  //             response +
  //             "</div>"
  //         );
  //         $(".modal-header").addClass("hide");
  //       $("#landingufw").fadeOut(400, function () {
  //         $("#landingufw").parent().find(".response").fadeIn();
  //       });

  //   }

  //   });
  // });
});
