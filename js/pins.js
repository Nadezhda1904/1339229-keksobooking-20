'use strict';

(function () {
  // Создание меток на карте
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinsFragment = document.createDocumentFragment();
  var pinsTemplate = document.querySelector('#pin').content.querySelector('button');

  var removeActiveClassPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var addActiveClassPin = function (pin) {
    removeActiveClassPin();
    pin.classList.add('map__pin--active');
  };

  // Генерирует метку карты
  var generatePin = function (add) {
    var pin = pinsTemplate.cloneNode(true);

    pin.style.left = add.location.x - (PIN_WIDTH / 2) + 'px';
    pin.style.top = add.location.y - PIN_HEIGHT + 'px';

    pin.querySelector('img').src = add.author.avatar;
    pin.querySelector('img').alt = add.offer.title;
    // Обработчик для показа объявления по клику на пин
    pin.addEventListener('click', function () {
      window.popup.openCard(add);
      addActiveClassPin(pin);
    });

    return pin;
  };

  // Добавляет метки, загруженные с сервера, на карту
  var addPins = function (adverts) {
    adverts.forEach(function (adv) {
      pinsFragment.appendChild(generatePin(adv));
    });
    window.popup.mapPin.appendChild(pinsFragment);
  };

  window.ads = [];

  var onSuccessAddPins = function (pins) {
    window.ads = pins;
    addPins(window.ads.slice(0, window.filters.MAX_PIN_ON_MAP_QUANTITY));
  };

  var onErrorAddPins = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  window.pins = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    addPin: addPins,
    onSuccessAddPin: onSuccessAddPins,
    onErrorAddPin: onErrorAddPins,
    removePin: removePins,
    removeActiveClassPin: removeActiveClassPin
  };

})();
