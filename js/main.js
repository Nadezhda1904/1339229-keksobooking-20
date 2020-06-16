'use strict';

var COUNT_OF_OBJECTS = 8;
var MAP_WIDTH = document.querySelector('.map').offsetWidth;
var MAP_HEIGHT = document.querySelector('.map').offsetHeight;
var MAP_PIN_BTN_WIDTH = document.querySelector('.map__pin--main').offsetWidth;
var MAP_PIN_BTN_HEIGHT = document.querySelector('.map__pin--main').offsetHeight;
var MAP_PIN_CURSOR_HEIGHT = 22;
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
var GUESTS = {
  'for 1 guest': '1',
  'for 2 guests': '2',
  'for 3 guests': '3',
  'not for guests': '0'
};
var ROOMS = {
  '1 room': '1',
  '2 rooms': '2',
  '3 rooms': '3',
  '100 rooms': '100'
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

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var adverts = [];

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
    adverts.push(generateAdverts(i));
  }
  return adverts;
};

var pinActive = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');
var address = document.querySelector('#address');


// Добавляет атрибут disabled полям формы (блокирование полей формы)
var addDisabledAttribute = function (field) {
  for (var i = 0; i < field.length; i++) {
    field[i].setAttribute('disabled', 'disabled');
  }
};

addDisabledAttribute(fieldsets);

// Удаляет атрибут disabled полям формы
var removeDisabledAttribute = function (field) {
  for (var i = 0; i < field.length; i++) {
    field[i].removeAttribute('disabled');
  }
};

// Добавляет координаты адреса на неактивню страницу
var getAddressNoActive = function () {
  address.value = Math.round((MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2) + ', ' + Math.round((MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2);
};

getAddressNoActive();

// Добавляет координаты адреса на активню страницу
var getAddressActive = function () {
  address.value = Math.round((MAP_WIDTH + MAP_PIN_BTN_WIDTH) / 2) + ', ' + Math.round((MAP_HEIGHT + MAP_PIN_BTN_HEIGHT) / 2 + MAP_PIN_CURSOR_HEIGHT);
};

// Карточка объявления
var cardsTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

// Создает карточку объявления
var createCard = function (template, adv) {
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

var createArray = createArrayAdverts();

// Попап
var popup;
var popupClose;

// Закрывает попап
var closePopup = function () {
  popup.remove();

  popupClose.removeEventListener('click', closePopup);
  popupClose.removeEventListener('keydown', onPopupEnterPress);
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
};

// Открывает попап (показывает объявление)
var openPopup = function (ad) {
  if (popup) {
    closePopup();
  }
  popup = pins.insertAdjacentElement('afterEnd', createCard(cardsTemplate, ad));
  popupClose = popup.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', onPopupEnterPress);
  document.addEventListener('keydown', onPopupEscPress);
};

// Создание меток на карте
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
  // Обработчик для показа объявления по клику на пин
  pin.addEventListener('click', function () {
    openPopup(add);
  });

  return pin;
};

// Переводит страницу в активное состояние
var activatePage = function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  createArrayAdverts();
  getAddressActive();
  removeDisabledAttribute(fieldsets);
  pinActive.removeEventListener('mouseup', activatePage);
  // Добавляет метки на карту
  for (var j = 0; j < COUNT_OF_OBJECTS; j++) {
    pinsFragment.appendChild(generatePins(createArray[j]));
  }
  pins.appendChild(pinsFragment);
};

// Обработчик для активации страницы левой (основной) кнопкой мыши
pinActive.addEventListener('mouseup', function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

// Обработчик для активации страницы с клавиатуры клавишей enter
pinActive.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activatePage();
  }
});

// Проверка валидации формы
var rooms = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

// Функция проверки соответствия количества гостей количеству комнат
var validateRoomsGuests = function () {
  capacity.setCustomValidity('');
  rooms.setCustomValidity('');
  if (rooms.value === ROOMS['1 room']) {
    if (capacity.value === GUESTS['for 2 guests'] || capacity.value === GUESTS['for 3 guests'] || capacity.value === GUESTS['not for guests']) {
      capacity.setCustomValidity('В 1-ой комнате может быть 1 гость');
      rooms.setCustomValidity('В 1-ой комнате может быть 1 гость');
    }
  }

  if (rooms.value === ROOMS['2 rooms']) {
    if (capacity.value === GUESTS['for 3 guests'] || capacity.value === GUESTS['not for guests']) {
      capacity.setCustomValidity('В 2-х комнатах может быть 2 гостя или 1 гость');
      rooms.setCustomValidity('В 2-х комнатах может быть 2 гостя или 1 гость');
    }
  }

  if (rooms.value === ROOMS['3 rooms']) {
    if (capacity.value === GUESTS['not for guests']) {
      capacity.setCustomValidity('В 3-х комнатах может быть 3 гостя, 2 гостя или 1 гость');
      rooms.setCustomValidity('В 3-х комнатах может быть 3 гостя, 2 гостя или 1 гость');
    }
  }

  if (rooms.value === ROOMS['100 rooms']) {
    if (capacity.value !== GUESTS['not for guests']) {
      capacity.setCustomValidity('100 комнат не для гостей');
      rooms.setCustomValidity('100 комнат не для гостей');
    }
  }
};

rooms.addEventListener('change', validateRoomsGuests);
capacity.addEventListener('change', validateRoomsGuests);

// Определение минимальной цены соответствующему типу жилья
var adForm = document.querySelector('.ad-form');
var typeOfHousing = adForm.querySelector('select[name="type"]');
var priceOfHousing = adForm.querySelector('input[name="price"]');

var validateMinPriceOfHousing = function () {
  var type = OFFER_TYPES[typeOfHousing.value];
  priceOfHousing.placeholder = type.minPrice;
  priceOfHousing.min = type.minPrice;
};

typeOfHousing.addEventListener('change', validateMinPriceOfHousing);

// Определение соответствия времени въезда выезду
adForm.onchange = function (evt) {
  this.timein.value = evt.target.value;
  this.timeout.value = evt.target.value;
};
