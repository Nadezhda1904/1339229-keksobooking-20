'use strict';

var COUNT_OF_OBJECTS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_POPUP = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
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
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var arrayAdverts = [];

// Вычисляет случайное число от min до max
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создает один объект(данные объявления)
var generateAdverts = function (count) {
  var advertsData = {
    'author': {
      'avatar': getAvatarCount(count)
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
  return advertsData;
};

var getAvatarCount = function (count) {
  var avatarNumber = '0' + (count + 1);
  if (count <= COUNT_OF_OBJECTS - 1) {
    return 'img/avatars/user' + avatarNumber + '.png';
  } else {
    return false;
  }
};

// Создает массив объявлений
var createArrayAdverts = function () {
  for (var i = 0; i < COUNT_OF_OBJECTS; i++) {
    arrayAdverts.push(generateAdverts(i));
  }
  return arrayAdverts;
};

// Переводит карту в активное состояние
var map = document.querySelector('.map');
map.classList.remove('map--faded');


var pins = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('button');
var pinsFragment = document.createDocumentFragment();

// Генерирует метки карты
var generatePins = function (add) {
  var pin = pinsTemplate.cloneNode(true);

  pin.style.left = add.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = add.location.y - PIN_HEIGHT + 'px';

  pin.querySelector('img').src = add.author.avatar;
  pin.querySelector('img').alt = add.offer.title;

  return pin;
};

// Добавляет метки на карту
for (var j = 0; j < COUNT_OF_OBJECTS; j++) {
  var createArray = createArrayAdverts();
  pinsFragment.appendChild(generatePins(createArray[j]));
}

pins.appendChild(pinsFragment);

// Карточка объявления
var cardsTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// Создает карточку объявления
var createCard = function (adv) {
  var cardBlock = cardsTemplate.cloneNode(true);

  cardBlock.querySelector('.popup__title').textContent = adv.offer.title;
  cardBlock.querySelector('.popup__text--address').textContent = adv.offer.address;
  cardBlock.querySelector('.popup__text--price').textContent = adv.offer.price + '₽/ночь';
  cardBlock.querySelector('.popup__type').textContent = TYPES_POPUP[adv.offer.type];
  cardBlock.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
  cardBlock.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
  cardBlock.querySelector('.popup__features').innerHTML = '';
  cardBlock.querySelector('.popup__description').textContent = adv.offer.description;
  cardBlock.querySelector('.popup__photos').innerHTML = '';
  cardBlock.querySelector('.popup__avatar').src = adv.author.avatar;

  for (var i = 0; i < adv.offer.features.length; i++) {
    if (adv.offer.features.length === 0) {
      cardBlock.querySelector('.popup__features').style = 'display: none';
    } else {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + adv.offer.features[i]);
      cardBlock.querySelector('.popup__features').append(featureItem);
    }
  }

  for (i = 0; i < adv.offer.photos.length; i++) {
    var blockPhoto = document.createElement('img');
    blockPhoto.src = adv.offer.photos[i];
    blockPhoto.width = 45;
    blockPhoto.height = 40;
    cardBlock.querySelector('.popup__photos').append(blockPhoto);
  }

  return cardBlock;
};

// Добавляет карточку объявления на страницу
document.querySelector('.map__filters-container').before(createCard(createArrayAdverts[0]));
