'use strict';

(function () {

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
    cardBlock.querySelector('.popup__type').textContent = window.data.TYPES_POPUP[adv.offer.type];
    cardBlock.querySelector('.popup__text--capacity').textContent = adv.offer.rooms + ' комнаты для ' + adv.offer.guests + ' гостей';
    cardBlock.querySelector('.popup__text--time').textContent = 'Заезд после ' + adv.offer.checkin + ', выезд до ' + adv.offer.checkout;
    cardBlock.querySelector('.popup__features').innerHTML = '';
    cardBlock.querySelector('.popup__description').textContent = adv.offer.description;
    cardBlock.querySelector('.popup__photos').innerHTML = '';
    cardBlock.querySelector('.popup__avatar').src = adv.author.avatar;

    renderFeature(cardBlock, adv);
    renderPhotos(cardBlock, adv);

    return cardBlock;
  };

  var renderFeature = function (template, ad) {
    for (var i = 0; i < ad.offer.features.length; i++) {
      if (ad.offer.features.length === 0) {
        template.querySelector('.popup__features').style = 'display: none';
      } else {
        var cardBlockFeature = document.createElement('li');
        cardBlockFeature.classList.add('popup__feature', 'popup__feature--' + ad.offer.features[i]);
        template.querySelector('.popup__features').append(cardBlockFeature);
      }
    }
  };

  var renderPhotos = function (template, ad) {
    for (var i = 0; i < ad.offer.photos.length; i++) {
      var cardBlockPhoto = document.createElement('img');
      cardBlockPhoto.src = ad.offer.photos[i];
      cardBlockPhoto.width = 45;
      cardBlockPhoto.height = 40;
      template.querySelector('.popup__photos').appendChild(cardBlockPhoto);
    }
  };

  var createArray = window.data.createArrayAdverts();

  window.card = {
    createCard: createCard,
    createArray: createArray,
  };

})();