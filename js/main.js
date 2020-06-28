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
    window.data.pinActive.addEventListener('mouseup', onPinActiveMouse);
    window.data.pinActive.removeEventListener('mouseup', onPinActiveEnter);
    window.data.pinActive.style.left = '570px';
    window.data.pinActive.style.top = '375px';
    window.pins.removePins();
    window.map.closeCard();
  };

  // Переводит страницу в активное состояние
  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.filters.toggleDisabledAttributeFilters(false, window.filters.filterFieldset, window.filters.filterSelect);
    window.form.renderAddress(true, window.form.location);
    window.form.toggleDisabledAttribute(false, window.form.fieldsets);
    window.data.pinActive.removeEventListener('mouseup', onPinActiveMouse);
    window.data.pinActive.removeEventListener('mouseup', onPinActiveEnter);
    window.load(window.pins.successHandler, window.pins.errorHandler);
  };

  // Обработчик для активации страницы левой (основной) кнопкой мыши
  var onPinActiveMouse = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  // Обработчик для активации страницы с клавиатуры клавишей enter
  var onPinActiveEnter = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
    }
  };

  window.data.pinActive.addEventListener('mouseup', onPinActiveMouse);
  window.data.pinActive.addEventListener('mouseup', onPinActiveEnter);

  // Отправка формы
  /* var sendForm = function (evt) {
    evt.preventDefault();
    window.upload(new FormData(window.form.adForm),
        function () {
          window.form.addformMessage(window.form.messageSuccess);
          deactivatePage();
        },
        function () {
          window.form.addformMessage(window.form.messageError);
        });
  };

  window.form.adForm.addEventListener('submit', sendForm);*/
  window.main = {
    deactivatePage: deactivatePage
  };
})();
