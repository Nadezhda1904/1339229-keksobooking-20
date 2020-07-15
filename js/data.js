'use strict';

(function () {
  var TYPES_POPUP = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var OFFER_TYPES = {
    bungalo: {
      translate: 'Бунгало',
      minPrice: 0
    },
    flat: {
      translate: 'Квартира',
      minPrice: 1000
    },
    house: {
      translate: 'Дом',
      minPrice: 5000
    },
    palace: {
      translate: 'Дворец',
      minPrice: 10000
    }
  };

  var map = document.querySelector('.map');

  window.data = {
    TYPES_POPUP: TYPES_POPUP,
    OFFER_TYPES: OFFER_TYPES,
    map: map
  };

})();
