'use strict';

// Переводит страницу в неактивное состояние
var deactivatePage = function () {
  window.data.map.classList.add('map--faded');
  window.form.adForm.classList.add('ad-form--disabled');
  window.form.renderAdress(false);
  window.form.toggleDisabledAttribute(true, window.form.fieldsets);
  document.addEventListener('keydown', onPinActiveEnter);
};

var resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', function () {
  deactivatePage();
});

// Переводит страницу в активное состояние
var activatePage = function () {
  window.data.map.classList.remove('map--faded');
  window.form.adForm.classList.remove('ad-form--disabled');
  window.data.createArrayAdverts();
  window.form.renderAdress(true);
  window.form.toggleDisabledAttribute(false, window.form.fieldsets);
  window.data.pinActive.removeEventListener('mouseup', onPinActiveMouse);
  window.data.pinActive.removeEventListener('mouseup', onPinActiveEnter);
  window.pins.addPins();
};

// Обработчик для активации страницы левой (основной) кнопкой мыши
var onPinActiveMouse = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

window.data.pinActive.addEventListener('mouseup', onPinActiveMouse);

// Обработчик для активации страницы с клавиатуры клавишей enter
var onPinActiveEnter = function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
};

window.data.pinActive.addEventListener('keydown', onPinActiveEnter);
