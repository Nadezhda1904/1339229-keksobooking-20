'use strict';

(function () {
  // Создание меток на карте
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinsFragment = document.createDocumentFragment();

  var pinsTemplate = document.querySelector('#pin').content.querySelector('button');

  // Генерирует метку карты
  var generatePin = function (add) {
    var pin = pinsTemplate.cloneNode(true);

    pin.style.left = add.location.x - (PIN_WIDTH / 2) + 'px';
    pin.style.top = add.location.y - PIN_HEIGHT + 'px';

    pin.querySelector('img').src = add.author.avatar;
    pin.querySelector('img').alt = add.offer.title;
    // Обработчик для показа объявления по клику на пин
    pin.addEventListener('click', function () {
      window.map.openCard(add);
    });

    return pin;
  };

  // Добавляет метки на карту
  /* var addPins = function () {
    for (var j = 0; j < window.data.COUNT_OF_OBJECTS; j++) {
      pinsFragment.appendChild(generatePin(window.data.generateAdverts()));
    }
    window.map.pins.appendChild(pinsFragment);
  };*/

  // Добавляет метки, загруженные с сервера, на карту
  var successHandler = function (adverts) {
    for (var j = 0; j < adverts.length; j++) {
      pinsFragment.appendChild(generatePin(adverts[j]));
    }
    window.map.pins.appendChild(pinsFragment);
  };

  var errorHandler = function (errorMessage) {
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
    generatePin: generatePin,
    pinsFragment: pinsFragment,
    successHandler: successHandler,
    errorHandler: errorHandler,
    // addPins: addPins,
    removePins: removePins
  };

})();
