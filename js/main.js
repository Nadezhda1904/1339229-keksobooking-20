'use strict';

// Переводит страницу в неактивное состояние
var deactivatePage = function () {
  window.data.map.classList.add('map--faded');
  window.form.adForm.classList.add('ad-form--disabled');
  window.form.renderAddress(false, window.form.location);
  window.form.toggleDisabledAttribute(true, window.form.fieldsets);
  document.addEventListener('keydown', onPinActiveMouseEnter);
  window.pins.removePins();
  window.map.closeCard();
};

var resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function () {
  deactivatePage();
});

// Переводит страницу в активное состояние
var activatePage = function () {
  window.data.map.classList.remove('map--faded');
  window.form.adForm.classList.remove('ad-form--disabled');
  window.form.renderAddress(true, window.form.location);
  window.form.toggleDisabledAttribute(false, window.form.fieldsets);
  window.data.pinActive.removeEventListener('mouseup', onPinActiveMouseEnter);
  // window.pins.addPins();
  window.load(window.pins.successHandler, window.pins.errorHandler);
};

// Обработчик для активации страницы левой (основной) кнопкой мыши или с клавиатуры клавишей enter
var onPinActiveMouseEnter = function (evt) {
  if (evt.button === 0 || evt.key === 'Enter') {
    activatePage();
  }
};

window.data.pinActive.addEventListener('mouseup', onPinActiveMouseEnter);
