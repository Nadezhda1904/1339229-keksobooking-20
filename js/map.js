'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
  var MAIN_PIN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAIN_PIN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
  var MAIN_PIN_CURSOR_HEIGHT = 22;
  var MAIN_PIN_DEFAULT = 'left: 570px; top: 375px;';

  var mainPin = document.querySelector('.map__pin--main');

  var getMainPinDefault = function () {
    mainPin.style = MAIN_PIN_DEFAULT;
  };

  // Обработчик для активации страницы левой (основной) кнопкой мыши
  var onMainPinMouse = function (evt) {
    if (evt.button === 0) {
      window.main.activatePage();
    }
  };

  // Обработчик для активации страницы с клавиатуры клавишей enter
  var onMainPinEnter = function (evt) {
    if (evt.key === 'Enter') {
      window.main.activatePage();
    }
  };

  var deactivateMap = function () {
    mainPin.addEventListener('mouseup', onMainPinMouse);
    mainPin.addEventListener('keydown', onMainPinEnter);
    getMainPinDefault();
    window.pins.removePin();
    window.popup.removeCard();
  };

  var activateMap = function () {
    mainPin.removeEventListener('mouseup', onMainPinMouse);
    mainPin.removeEventListener('keydown', onMainPinEnter);
    window.backend.load(window.pins.onSuccessAddPin, window.pins.onErrorAddPin);
  };

  mainPin.addEventListener('mouseup', onMainPinMouse);
  mainPin.addEventListener('keydown', onMainPinEnter);


  window.map = {
    WIDTH: MAP_WIDTH,
    HEIGHT: MAP_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_CURSOR_HEIGHT: MAIN_PIN_CURSOR_HEIGHT,
    mainPin: mainPin,
    deactivate: deactivateMap,
    activate: activateMap
  };
})();
