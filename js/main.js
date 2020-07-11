'use strict';

(function () {
  // Переводит страницу в неактивное состояние
  var deactivatePage = function () {
    window.data.map.classList.add('map--faded');
    window.map.deactivateMap();
    window.filters.filterDisabled();
    window.form.deactivateForm();
  };

  // Переводит страницу в активное состояние
  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    window.map.activateMap();
    window.filters.filterEnabled();
    window.form.activateForm();
  };

  // Сброс страницы
  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage
  };
})();
