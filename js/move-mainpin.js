'use strict';
(function () {

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

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

      var currentX = window.map.mainPin.offsetLeft - shift.x;
      var currentY = window.map.mainPin.offsetTop - shift.y;

      var minX = Math.floor(window.map.MAP_PIN_BTN_WIDTH / -2);
      var maxX = window.map.MAP_WIDTH - Math.round(window.map.MAP_PIN_BTN_WIDTH / 2);
      var minY = LOCATION_Y_MIN - window.map.MAP_PIN_BTN_HEIGHT - window.map.MAP_PIN_CURSOR_HEIGHT;
      var maxY = LOCATION_Y_MAX - window.map.MAP_PIN_BTN_HEIGHT - window.map.MAP_PIN_CURSOR_HEIGHT;

      if (currentX < 0) {
        currentX = minX;
      } else if (currentX > maxX) {
        currentX = maxX;
      } else {
        currentX = window.map.mainPin.offsetLeft - shift.x;
      }

      if (currentY < minY) {
        currentY = minY;
      } else if (currentY > maxY) {
        currentY = maxY;
      } else {
        currentY = window.map.mainPin.offsetTop - shift.y;
      }

      window.map.mainPin.style.left = currentX + 'px';
      window.map.mainPin.style.top = currentY + 'px';

      newLocation = {
        x: currentX + Math.round(window.map.MAP_PIN_BTN_WIDTH / 2),
        y: currentY + window.map.MAP_PIN_BTN_HEIGHT
      };

      window.form.renderAddress(true, newLocation);
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
