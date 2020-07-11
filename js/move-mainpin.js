'use strict';
(function () {

  var newLocation;
  var onMainPinMouseMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (
        window.map.mainPin.offsetLeft + window.map.MAP_PIN_BTN_WIDTH / 2 - shift.x >= 0
        && window.map.mainPin.offsetLeft + window.map.MAP_PIN_BTN_WIDTH / 2 - shift.x <= window.map.MAP_WIDTH
        && window.map.mainPin.offsetTop + window.map.MAP_PIN_BTN_HEIGHT + window.map.MAP_PIN_CURSOR_HEIGHT - shift.y >= 130
        && window.map.mainPin.offsetTop + window.map.MAP_PIN_BTN_HEIGHT + window.map.MAP_PIN_CURSOR_HEIGHT - shift.y <= 630
      ) {

        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';

        newLocation = {
          x: window.map.mainPin.offsetLeft + Math.floor(window.map.MAP_PIN_BTN_WIDTH / 2) - shift.x,
          y: window.map.mainPin.offsetTop + window.map.MAP_PIN_BTN_HEIGHT - shift.y
        };

        window.form.renderAddress(true, newLocation);
      }
      shift.x = 0;
      shift.y = 0;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.map.mainPin.addEventListener('mousedown', onMainPinMouseMove);

  window.moveMainPin = {
    onMainPinMouseMove: onMainPinMouseMove
  };

})();
