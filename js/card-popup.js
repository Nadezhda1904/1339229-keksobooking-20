'use strict';

(function () {
  // Попап
  var card;
  var cardClose;
  var mapPin = document.querySelector('.map__pins');

  // Удаляет карту
  var removeCard = function () {
    if (card) {
      card.remove();
    }
  };

  // Закрывает попап
  var closeCard = function () {
    removeCard();
    cardClose.removeEventListener('click', onCardCloseEnter);
    document.removeEventListener('keydown', onCardEscPress);
    document.removeEventListener('keydown', onCardEnterPress);
    window.pins.removeActiveClassPin();
  };

  var onCardCloseEnter = function () {
    closeCard();
  };

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  var onCardEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      closeCard();
    }
  };

  // Открывает попап (показывает объявление)
  var openCard = function (ad) {
    if (card) {
      closeCard();
    }
    card = mapPin.insertAdjacentElement('afterEnd', window.renderCards.createCard(ad));
    cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', onCardCloseEnter);
    document.addEventListener('keydown', onCardEscPress);
    document.addEventListener('keydown', onCardEnterPress);
  };

  window.popup = {
    mapPin: mapPin,
    removeCard: removeCard,
    openCard: openCard
  };
})();
