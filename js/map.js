'use strict';

(function () {
  var MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
  var MAP_PIN_BTN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
  var MAP_PIN_BTN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
  var MAP_PIN_CURSOR_HEIGHT = 22;
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
    window.pins.removePins();
    window.cardPopup.removeCard();
  };

  var activateMap = function () {
    mainPin.removeEventListener('mouseup', onMainPinMouse);
    mainPin.removeEventListener('keydown', onMainPinEnter);
    window.backend.load(window.pins.onSuccessAddPins, window.pins.onErrorAddPins);
  };

  mainPin.addEventListener('mouseup', onMainPinMouse);
  mainPin.addEventListener('keydown', onMainPinEnter);


  window.map = {
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGHT: MAP_HEIGHT,
    MAP_PIN_BTN_WIDTH: MAP_PIN_BTN_WIDTH,
    MAP_PIN_BTN_HEIGHT: MAP_PIN_BTN_HEIGHT,
    MAP_PIN_CURSOR_HEIGHT: MAP_PIN_CURSOR_HEIGHT,
    mainPin: mainPin,
    deactivateMap: deactivateMap,
    activateMap: activateMap
  };
})();
