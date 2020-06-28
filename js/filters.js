'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var filterFieldset = filterForm.querySelector('fieldset');
  var filterSelect = filterForm.querySelectorAll('select');


  var toggleDisabledAttributeFilters = function (isPageNotActive, field, select) {
    for (var i = 0; i < select.length; i++) {
      if (isPageNotActive) {
        select[i].setAttribute('disabled', 'disabled');
        field.setAttribute('disabled', 'disabled');
        filterForm.reset();
      } else {
        select[i].removeAttribute('disabled');
        field.removeAttribute('disabled');
      }
    }
  };

  toggleDisabledAttributeFilters(true, filterFieldset, filterSelect);

  window.filters = {
    filterFieldset: filterFieldset,
    filterSelect: filterSelect,
    toggleDisabledAttributeFilters: toggleDisabledAttributeFilters
  };
})();
