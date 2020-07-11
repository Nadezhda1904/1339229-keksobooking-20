'use strict';

(function () {
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
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = document.querySelector('#address');
  var adFormFields = adForm.querySelectorAll('input, select');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  // Добавляет координаты адреса на страницу
  var location = {
    x: Math.round(window.map.mainPin.offsetLeft + window.map.MAP_PIN_BTN_WIDTH / 2),
    y: Math.round(window.map.mainPin.offsetTop + window.map.MAP_PIN_BTN_HEIGHT / 2)
  };

  function renderAddress(isPageActive, coord) {
    if (isPageActive) {
      adFormAddress.value = coord.x + ', ' + (coord.y + window.map.MAP_PIN_CURSOR_HEIGHT);
    } else {
      adFormAddress.value = coord.x + ', ' + coord.y;
    }
  }
  renderAddress(false, location);

  // Добавляет/удаляет атрибут disabled полям формы (блокирование полей формы)
  var toggleDisabledAttribute = function (isPageNotActive, field) {
    if (isPageNotActive) {
      field.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
    } else {
      field.forEach(function (it) {
        it.removeAttribute('disabled');
      });
    }
  };

  toggleDisabledAttribute(true, adFormFieldsets);

  // Деактивация формы
  var deactivateForm = function () {
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    toggleDisabledAttribute(true, adFormFieldsets);
    renderAddress(false, location);
    typeOfHousing.removeEventListener('change', validateMinPriceOfHousing);
    priceReset();
    window.previewImage.disableLoadImg();
    adFormSubmit.removeEventListener('click', onFormSubmitClick);
  };

  // Активация формы
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    toggleDisabledAttribute(false, adFormFieldsets);
    renderAddress(true, location);
    typeOfHousing.addEventListener('change', validateMinPriceOfHousing);
    window.previewImage.activateLoadImg();
    adFormSubmit.addEventListener('click', onFormSubmitClick);
  };

  // Сообщение об успехе/ошибке отправки формы
  var messageSuccessTmpl = document.querySelector('#success').content.querySelector('.success');
  var messageSuccess = messageSuccessTmpl.cloneNode(true);
  var messageErrorTmpl = document.querySelector('#error').content.querySelector('.error');
  var messageError = messageErrorTmpl.cloneNode(true);

  var addformMessage = function (message) {
    document.body.appendChild(message);
    document.addEventListener('click', onDocumentClick);
    window.addEventListener('keydown', onDocumentEscape);
  };

  var removeformMessage = function () {
    document.querySelector('.message').remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentEscape);
  };

  // Обработчик удаления сообщений при отправки формы по клику на документ
  var onDocumentClick = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      removeformMessage();
    }
  };

  // Обработчик удаления сообщений при отправки формы по по клику на Escape
  var onDocumentEscape = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      removeformMessage();
    }
  };

  // Отправка формы
  var onSubmitSendForm = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm),
        function () {
          addformMessage(messageSuccess);
          window.main.deactivatePage();
        },
        function () {
          addformMessage(messageError);
          validateFormFields(adFormFields);
        });
  };

  adForm.addEventListener('submit', onSubmitSendForm);

  // Функция добавления класса ошибки на невалидные поля
  var validateFormFields = function (formFields) {
    formFields.forEach(function (item) {
      item.classList.toggle('error-form', !item.validity.valid);
    });
  };

  var onFormSubmitClick = function () {
    validateFormFields(adFormFields);
  };

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

  var priceReset = function () {
    var type = window.data.OFFER_TYPES.flat;
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
    location: location,
    renderAddress: renderAddress,
    activateForm: activateForm,
    deactivateForm: deactivateForm
  };

})();
