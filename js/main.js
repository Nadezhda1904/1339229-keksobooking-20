'use strict';

(function () {
  // Переводит страницу в неактивное состояние
  var deactivatePage = function () {
    window.data.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.filters.toggleDisabledAttributeFilters(true, window.filters.filterFieldset, window.filters.filterSelect);
    window.form.adForm.reset();
    window.form.toggleDisabledAttribute(true, window.form.fieldsets);
    window.form.renderAddress(false, window.form.location);
    window.data.mainPin.addEventListener('mouseup', onMainPinMouse);
    window.data.mainPin.removeEventListener('keydown', onMainPinEnter);
    window.data.mainPin.style.left = '570px';
    window.data.mainPin.style.top = '375px';
    window.pins.removePins();
    window.cardPopup.removeCard();
  };

  // Переводит страницу в активное состояние
  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.filters.toggleDisabledAttributeFilters(false, window.filters.filterFieldset, window.filters.filterSelect);
    window.form.renderAddress(true, window.form.location);
    window.form.toggleDisabledAttribute(false, window.form.fieldsets);
    window.data.mainPin.removeEventListener('mouseup', onMainPinMouse);
    window.data.mainPin.removeEventListener('keydown', onMainPinEnter);
    window.load(window.pins.onSuccessAddPins, window.pins.onErrorAddPins);
  };

  // Обработчик для активации страницы левой (основной) кнопкой мыши
  var onMainPinMouse = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  // Обработчик для активации страницы с клавиатуры клавишей enter
  var onMainPinEnter = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  window.data.mainPin.addEventListener('mouseup', onMainPinMouse);
  window.data.mainPin.addEventListener('keydown', onMainPinEnter);

  window.main = {
    deactivatePage: deactivatePage
  };
})();
