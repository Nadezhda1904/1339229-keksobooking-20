'use strict';

(function () {
  var MAP_PIN_BTN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAP_PIN_BTN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
  var MAP_PIN_CURSOR_HEIGHT = 22;
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;

  var countOfGuestsInRoom = {
    1: {
      guestsValue: [1],
      error: 'В 1-ой комнате может быть 1 гость',
    },
    2: {
      guestsValue: [1, 2],
      error: 'В 2-х комнатах может быть 2 гостя или 1 гость'
    },
    3: {
      guestsValue: [1, 2, 3],
      error: 'В 3-х комнатах может быть 3 гостя, 2 гостя или 1 гость'
    },
    100: {
      guestsValue: [0],
      error: '100 комнат не для гостей'
    },
  };

  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');

  // Добавляет/удаляет атрибут disabled полям формы (блокирование полей формы)
  var toggleDisabledAttribute = function (isPageNotActive, field) {
    for (var i = 0; i < field.length; i++) {
      if (isPageNotActive) {
        field[i].setAttribute('disabled', 'disabled');
      } else {
        field[i].removeAttribute('disabled');
      }
    }
  };

  toggleDisabledAttribute(true, fieldsets);

  // Добавляет координаты адреса на страницу
  var location = {
    x: Math.round(window.data.pinActive.offsetLeft + MAP_PIN_BTN_WIDTH / 2),
    y: Math.round(window.data.pinActive.offsetTop + MAP_PIN_BTN_HEIGHT / 2)
  };

  function renderAddress(isPageActive, coord) {
    if (isPageActive) {
      address.value = coord.x + ', ' + (coord.y + MAP_PIN_CURSOR_HEIGHT);
    } else {
      address.value = coord.x + ', ' + coord.y;
    }
  }
  renderAddress(false, location);

  // Сообщение об успехе/ошибке отправки формы
  var messageSuccessTmpl = document.querySelector('#success').content.querySelector('.success');
  var messageSuccess = messageSuccessTmpl.cloneNode(true);
  var messageErrorTmpl = document.querySelector('#error').content.querySelector('.error');
  var messageError = messageErrorTmpl.cloneNode(true);

  var addformMessage = function (message) {
    document.body.appendChild(message);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscape);
  };

  // Сообщение об успешной отправке формы
  /* var formMessageSuccess = function () {
    var messageSuccessTmpl = document.querySelector('#success').content.querySelector('.success');
    var messageSuccess = messageSuccessTmpl.cloneNode(true);
    document.body.appendChild(messageSuccess);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscape);
  };

  // Сообщение об ошибке отправки формы
  var formMessageError = function () {
    var messageErrorTmpl = document.querySelector('#error').content.querySelector('.error');
    var messageError = messageErrorTmpl.cloneNode(true);
    document.body.appendChild(messageError);
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscape);
  };*/

  var removeformMessage = function () {
    document.querySelector('.message').remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscape);
  };

  // Обработчик удаления сообщений по клику на документ
  var onDocumentClick = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      removeformMessage();
    }
  };

  // Обработчик удаления сообщений по по клику на Escape
  var onDocumentEscape = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      removeformMessage();
    }
  };

  // Отправка формы
  var onSubmitSendForm = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm),
        function () {
          addformMessage(messageSuccess);
          window.main.deactivatePage();
        },
        function () {
          addformMessage(messageError);
        });
  };

  adForm.addEventListener('submit', onSubmitSendForm);

  // Очистка формы
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    window.main.deactivatePage();
  });

  // Проверка валидации формы
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Функция проверки соответствия количества гостей количеству комнат
  var validateRoomsGuests = function () {
    capacity.setCustomValidity('');
    rooms.setCustomValidity('');
    var validValue = countOfGuestsInRoom[rooms.value].guestsValue.find(function (number) {
      return number === Number(capacity.value);
    });
    return validValue ? true : (
      capacity.setCustomValidity(countOfGuestsInRoom[rooms.value].error),
      rooms.setCustomValidity(countOfGuestsInRoom[rooms.value].error));
  };

  rooms.addEventListener('change', validateRoomsGuests);
  capacity.addEventListener('change', validateRoomsGuests);

  // Определение минимальной цены соответствующему типу жилья
  var typeOfHousing = adForm.querySelector('select[name="type"]');
  var priceOfHousing = adForm.querySelector('input[name="price"]');

  var validateMinPriceOfHousing = function () {
    var type = window.data.OFFER_TYPES[typeOfHousing.value];
    priceOfHousing.placeholder = type.minPrice;
    priceOfHousing.min = type.minPrice;
  };

  typeOfHousing.addEventListener('change', validateMinPriceOfHousing);

  // Определение соответствия времени въезда выезду
  var timeForm = document.querySelector('.ad-form__element--time');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  timeForm.onchange = function (evt) {
    timeIn.value = evt.target.value;
    timeOut.value = evt.target.value;
  };

  window.form = {
    MAP_PIN_BTN_WIDTH: MAP_PIN_BTN_WIDTH,
    MAP_PIN_BTN_HEIGHT: MAP_PIN_BTN_HEIGHT,
    MAP_PIN_CURSOR_HEIGHT: MAP_PIN_CURSOR_HEIGHT,
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGHT: MAP_HEIGHT,
    location: location,
    adForm: adForm,
    fieldsets: fieldsets,
    address: address,
    renderAddress: renderAddress,
    toggleDisabledAttribute: toggleDisabledAttribute,
    // formMessageSuccess: formMessageSuccess,
    // formMessageError: formMessageError
    // messageSuccess: messageSuccess,
    // messageError: messageError,
    // addformMessage: addformMessage
  };

})();
