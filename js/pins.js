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
  var addPins = function () {
    for (var j = 0; j < window.data.COUNT_OF_OBJECTS; j++) {
      pinsFragment.appendChild(generatePin(window.data.generateAdverts()));
    }
    window.map.pins.appendChild(pinsFragment);
  };

  window.pins = {
    generatePin: generatePin,
    pinsFragment: pinsFragment,
    addPins: addPins
  };

})();
