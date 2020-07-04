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

  // Фильтрует объявления
  var getFilteredAdverts = function (ads) {
    for (var i = 0; i < window.ads.length; i++) {
      var filteredAdverts = ads.filter(function (ad) {
        return checkHousing(ad)
        && checkPrice(ad)
        && checkRooms(ad)
        && checkGuests(ad)
        && checkFeatures(ad);
      });
      if (window.ads.length === MAX_PIN_ON_MAP_QUANTITY) {
        break;
      }
    }
    return filteredAdverts.slice(0, MAX_PIN_ON_MAP_QUANTITY);
  };

  // Функция выбора фильтров
  var checkfilterItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  // Выбор типа жилья
  var checkHousing = function (ad) {
    return checkfilterItem(filterHousingType, ad.offer, 'type');
  };

  // Выбор диапазона цены
  var checkPrice = function (ad) {
    var priceRange = FILTER_PRICE_VALUES[filterPrice.value];
    return filterPrice.value === FILTER_VALUE_DEFAULT ? true : ad.offer.price > priceRange.min && ad.offer.price <= priceRange.max;
  };

  // Выбор количества комнат
  var checkRooms = function (ad) {
    return checkfilterItem(filterRoomNumber, ad.offer, 'rooms');
  };

  // Выбор количества гостей
  var checkGuests = function (ad) {
    return checkfilterItem(filterGuestCapacity, ad.offer, 'guests');
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
    window.cardPopup.removeCard();
    window.pins.removePins();
    window.debounce(window.pins.addPins(getFilteredAdverts(window.ads)));
  };

  filterForm.addEventListener('change', onFilterChange);

  window.filters = {
    filterFieldset: filterFieldset,
    filterSelect: filterSelect,
    toggleDisabledAttributeFilters: toggleDisabledAttributeFilters,
    MAX_PIN_ON_MAP_QUANTITY: MAX_PIN_ON_MAP_QUANTITY
  };

})();
