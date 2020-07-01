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

  // Фильтрует объявления
  function getFilteredAdverts(ads) {
    var filteredAdverts = ads.filter(function (ad) {
      return checkHousing(ad) && checkPrice(ad)
      && checkRooms(ad) && checkGuests(ad) && checkFeatures(ad);
    });

    return filteredAdverts.slice(0, MAX_PIN_ON_MAP_QUANTITY);
  }

  // Выбор типа жилья
  function checkHousing(ad) {
    return filterHousingType.value === FILTER_VALUE_DEFAULT ? true : filterHousingType.value === ad.offer.type;
  }

  // Выбор диапазона цены
  var checkPrice = function (ad) {
    var priceRange = FILTER_PRICE_VALUES[filterPrice.value];
    return filterPrice.value === FILTER_VALUE_DEFAULT ? true : ad.offer.price > priceRange.min && ad.offer.price <= priceRange.max;
  };

  // Выбор количества комнат
  var checkRooms = function (ad) {
    return filterRoomNumber.value === FILTER_VALUE_DEFAULT ? true : ad.offer.rooms;
  };

  // Выбор количества гостей
  var checkGuests = function (ad) {
    return filterGuestCapacity.value === FILTER_VALUE_DEFAULT ? true : ad.offer.guests;
  };

  // Выбор удобств
  var checkFeatures = function (ad) {
    var checkedFeaturesItems = filterFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return ad.offer.features.includes(element.value);
    });
  };

  // Обработчик изменения фильтров
  function onFilterChange() {
    window.map.closeCard();
    window.pins.removePins();
    window.debounce(window.pins.addPins(getFilteredAdverts(window.ads)));
  }

  filterForm.addEventListener('change', onFilterChange);

  window.filters = {
    filterFieldset: filterFieldset,
    filterSelect: filterSelect,
    toggleDisabledAttributeFilters: toggleDisabledAttributeFilters,
    MAX_PIN_ON_MAP_QUANTITY: MAX_PIN_ON_MAP_QUANTITY
  };

})();
