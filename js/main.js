'use strict';

var COUNT_OF_OBJECTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ArrayObjects = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateObjects = function (i) {
  var Objects = {
    'author': {
      'avatar': getAvatarCount(i)
    },

    'offer': {
      'title': 'Заголовок объявления',
      'address': getRandomNumber(0, map.offsetWidth) + ', ' + getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX),
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
      'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
      'checkin': CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      'checkout': CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      'features': FEATURES,
      'description': 'Описание объявления',
      'photos': PHOTOS[getRandomNumber(0, PHOTOS.length - 1)]
    },
    'location': {
      'x': getRandomNumber(0, map.offsetWidth),
      'y': getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    }
  };
  return Objects;
};

function getAvatarCount(i) {
  var avatarNumber = '0' + (i + 1);
  return 'img/avatars/user' + avatarNumber + '.png';
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('button');
var pinsFragment = document.createDocumentFragment();

var generatePins = function (add) {
  var pin = pinsTemplate.cloneNode(true);

  pin.style.left = add.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = add.location.y - PIN_HEIGHT + 'px';

  pin.querySelector('img').src = add.author.avatar;
  pin.querySelector('img').alt = add.offer.title;

  return pin;
};

for (var i = 0; i < COUNT_OF_OBJECTS; i++) {
  ArrayObjects.push(generateObjects(i));
  pinsFragment.appendChild(generatePins(ArrayObjects[i]));
}

pins.appendChild(pinsFragment);
