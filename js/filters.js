'use strict';

(function () {

  var FILTER_VALUE_DEFAULT = 'any';
  var MAX_PIN_ON_MAP_QUANTITY = 5;

  var FILTER_PRICE_VALUES = {
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Number.MAX_SAFE_INTEGER
    }
  };

  var filterForm = document.querySelector('.map__filters');
  var filterFieldset = filterForm.querySelector('fieldset');
  var filterSelect = filterForm.querySelectorAll('select');
  var filterHousingType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRoomNumber = filterForm.querySelector('#housing-rooms');
  var filterGuestCapacity = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelector('#housing-features');

  // Добавляет/удаляет атрибут disabled полям фильтра (блокирование полей фильтра)
  var toggleDisabledAttributeFilters = function (isPageNotActive, field, select) {
    if (isPageNotActive) {
      select.forEach(function (it) {
        it.setAttribute('disabled', 'disabled');
      });
      field.setAttribute('disabled', 'disabled');
      filterForm.reset();
    } else {
      select.forEach(function (it) {
        it.removeAttribute('disabled');
      });
      field.removeAttribute('disabled');
    }
  };

  toggleDisabledAttributeFilters(true, filterFieldset, filterSelect);

  var resetFilter = function () {
    filterHousingType.value = FILTER_VALUE_DEFAULT;
    filterPrice.value = FILTER_VALUE_DEFAULT;
    filterRoomNumber.value = FILTER_VALUE_DEFAULT;
    filterGuestCapacity.value = FILTER_VALUE_DEFAULT;
    filterFeatures.querySelectorAll('input:checked').forEach(function (elem) {
      elem.checked = false;
    });
  };

  // Фильтрует объявления
  var getFilteredAdverts = function (ads) {
    var filteredAdverts = [];
    for (var i = 0; i < ads.length; i++) {
      if (checkfilterItem(filterHousingType, ads[i].offer, 'type') &&
        checkfilterItem(filterRoomNumber, ads[i].offer, 'rooms') &&
        checkfilterItem(filterGuestCapacity, ads[i].offer, 'guests') &&
        checkPrice(ads[i]) &&
        checkFeatures(ads[i])) {
        filteredAdverts.push(ads[i]);
      }
      if (filteredAdverts.length === MAX_PIN_ON_MAP_QUANTITY) {
        break;
      }
    }
    return filteredAdverts;
  };

  // Функция выбора фильтров (типа жилья, комнат, гостей)
  var checkfilterItem = function (it, item, key) {
    return it.value === FILTER_VALUE_DEFAULT ? true : it.value === item[key].toString();
  };

  // Выбор диапазона цены
  var checkPrice = function (ad) {
    var priceRange = FILTER_PRICE_VALUES[filterPrice.value];
    return filterPrice.value === FILTER_VALUE_DEFAULT ? true : ad.offer.price > priceRange.min && ad.offer.price <= priceRange.max;
  };

  // Выбор удобств
  var checkFeatures = function (ad) {
    var checkedFeaturesItems = filterFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return ad.offer.features.includes(element.value);
    });
  };

  // Обработчик изменения фильтров
  var onFilterChange = function () {
    window.popup.removeCard();
    window.pins.removePin();
    window.pins.addPin(getFilteredAdverts(window.ads));
  };

  filterForm.addEventListener('change', window.util.debounce(onFilterChange));

  // Блокировка фильтров
  var filterDisabled = function () {
    resetFilter();
    toggleDisabledAttributeFilters(true, filterFieldset, filterSelect);
    filterForm.removeEventListener('change', window.util.debounce(onFilterChange));
  };

  // Разблокировка фильтров
  var filterEnabled = function () {
    toggleDisabledAttributeFilters(false, filterFieldset, filterSelect);
    filterForm.addEventListener('change', window.util.debounce(onFilterChange));
  };


  window.filters = {
    MAX_PIN_ON_MAP_QUANTITY: MAX_PIN_ON_MAP_QUANTITY,
    filterDisabled: filterDisabled,
    filterEnabled: filterEnabled
  };

})();
