'use strict';
(function () {

  var newLocation;

  window.data.pinActive.addEventListener('mousedown', function (evt) {
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
        window.data.pinActive.offsetLeft - window.form.MAP_PIN_BTN_WIDTH / 2 - shift.x >= 0 &&
        window.data.pinActive.offsetLeft + window.form.MAP_PIN_BTN_WIDTH - shift.x <= window.form.MAP_WIDTH &&
        window.data.pinActive.offsetTop + window.form.MAP_PIN_BTN_HEIGHT - shift.y >= 130 &&
        window.data.pinActive.offsetTop + window.form.MAP_PIN_BTN_HEIGHT - shift.y <= 630
      ) {

        window.data.pinActive.style.left = (window.data.pinActive.offsetLeft - shift.x) + 'px';
        window.data.pinActive.style.top = (window.data.pinActive.offsetTop - shift.y) + 'px';

        newLocation = {
          x: window.form.location.x + (window.data.pinActive.offsetLeft - shift.x),
          y: window.form.location.y + (window.data.pinActive.offsetTop - shift.y)
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
  });

  window.mainPin = {
    newLocation: newLocation
  };

})();
