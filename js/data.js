'use strict';

(function () {
  var COUNT_OF_OBJECTS = 8;
  var COUNT_OF_AVATAR = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TYPES_POPUP = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var PRICE_MIN = 1000;
  var PRICE_MAX = 100000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 3;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 3;

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

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var pinActive = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  // Вычисляет случайное число от min до max
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создает один объект(данные объявления)
  var generateAdverts = function () {
    var advertsData = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, COUNT_OF_AVATAR) + '.png'
      },

      offer: {
        title: 'Заголовок объявления',
        address: getRandomNumber(0, map.offsetWidth) + ', ' + getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX),
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: TYPES[getRandomNumber(0, TYPES.length - 1)],
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
        features: FEATURES,
        description: 'Описание объявления',
        photos: PHOTOS
      },
      location: {
        x: getRandomNumber(0, map.offsetWidth),
        y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };
    return advertsData;
  };

  window.data = {
    COUNT_OF_OBJECTS: COUNT_OF_OBJECTS,
    TYPES_POPUP: TYPES_POPUP,
    OFFER_TYPES: OFFER_TYPES,
    pinActive: pinActive,
    map: map,
    generateAdverts: generateAdverts
  };

})();
