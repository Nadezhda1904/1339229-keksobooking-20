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

    renderFeature(cardBlock, adv.offer.features);
    renderPhotos(cardBlock, adv.offer.photos);

    return cardBlock;
  };

  var renderFeature = function (template, adv) {
    adv.forEach(function (ad) {
      if (ad.length === 0) {
        template.querySelector('.popup__features').style = 'display: none';
      } else {
        var cardBlockFeature = document.createElement('li');
        cardBlockFeature.classList.add('popup__feature', 'popup__feature--' + ad);
        template.querySelector('.popup__features').append(cardBlockFeature);
      }
    });
  };

  var renderPhotos = function (template, adv) {
    adv.forEach(function (ad) {
      var cardBlockPhoto = document.createElement('img');
      cardBlockPhoto.src = ad;
      cardBlockPhoto.width = 45;
      cardBlockPhoto.height = 40;
      template.querySelector('.popup__photos').appendChild(cardBlockPhoto);
      cardBlockPhoto.classList.add('popup__photo');
    });
  };

  window.renderCards = {
    createCard: createCard,
  };

})();
