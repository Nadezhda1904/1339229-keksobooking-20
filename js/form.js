'use strict';

(function () {
  var MAP_PIN_BTN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAP_PIN_BTN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
  var MAP_PIN_CURSOR_HEIGHT = 22;
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
  var COUNT_OF_GUESTS = {
    one: '1',
    two: '2',
    three: '3',
    zero: '0'
  };
  var COUNT_OF_ROOMS = {
    one: '1',
    two: '2',
    three: '3',
    hundred: '100'
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
  function renderAdress(isPageActive) {
    if (isPageActive) {
      address.value = Math.round((MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2) + ', ' + Math.round((MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2 + MAP_PIN_CURSOR_HEIGHT);
    } else {
      address.value = Math.round((MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2) + ', ' + Math.round((MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2);
    }
  }
  renderAdress(false);

  // Проверка валидации формы
  var rooms = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Функция проверки соответствия количества гостей количеству комнат
  var validateRoomsGuests = function () {
    capacity.setCustomValidity('');
    rooms.setCustomValidity('');
    if (rooms.value === COUNT_OF_ROOMS.one) {
      if (capacity.value === COUNT_OF_GUESTS.two || capacity.value === COUNT_OF_GUESTS.three || capacity.value === COUNT_OF_GUESTS.zero) {
        capacity.setCustomValidity('В 1-ой комнате может быть 1 гость');
        rooms.setCustomValidity('В 1-ой комнате может быть 1 гость');
      }
    }

    if (rooms.value === COUNT_OF_ROOMS.two) {
      if (capacity.value === COUNT_OF_GUESTS.three || capacity.value === COUNT_OF_GUESTS.zero) {
        capacity.setCustomValidity('В 2-х комнатах может быть 2 гостя или 1 гость');
        rooms.setCustomValidity('В 2-х комнатах может быть 2 гостя или 1 гость');
      }
    }

    if (rooms.value === COUNT_OF_ROOMS.three) {
      if (capacity.value === COUNT_OF_GUESTS.zero) {
        capacity.setCustomValidity('В 3-х комнатах может быть 3 гостя, 2 гостя или 1 гость');
        rooms.setCustomValidity('В 3-х комнатах может быть 3 гостя, 2 гостя или 1 гость');
      }
    }

    if (rooms.value === COUNT_OF_ROOMS.hundred) {
      if (capacity.value !== COUNT_OF_GUESTS.zero) {
        capacity.setCustomValidity('100 комнат не для гостей');
        rooms.setCustomValidity('100 комнат не для гостей');
      }
    }
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
  adForm.onchange = function (evt) {
    this.timein.value = evt.target.value;
    this.timeout.value = evt.target.value;
  };

  window.form = {
    adForm: adForm,
    fieldsets: fieldsets,
    renderAdress: renderAdress,
    toggleDisabledAttribute: toggleDisabledAttribute,
  };
})();
