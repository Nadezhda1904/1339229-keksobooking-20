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
        window.data.mainPin.offsetLeft + window.form.MAP_PIN_BTN_WIDTH / 2 - shift.x >= 0
        && window.data.mainPin.offsetLeft + window.form.MAP_PIN_BTN_WIDTH / 2 - shift.x <= window.form.MAP_WIDTH
        && window.data.mainPin.offsetTop + window.form.MAP_PIN_BTN_HEIGHT - shift.y >= 130
        && window.data.mainPin.offsetTop + window.form.MAP_PIN_BTN_HEIGHT - shift.y <= 630
      ) {

        window.data.mainPin.style.left = (window.data.mainPin.offsetLeft - shift.x) + 'px';
        window.data.mainPin.style.top = (window.data.mainPin.offsetTop - shift.y) + 'px';

        newLocation = {
          x: window.data.mainPin.offsetLeft - shift.x,
          y: window.data.mainPin.offsetTop - shift.y
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
