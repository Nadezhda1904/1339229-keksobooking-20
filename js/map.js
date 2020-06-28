'use strict';

(function () {
  // Попап
  var card;
  var cardClose;
  var pins = document.querySelector('.map__pins');

  // Закрывает попап
  var closeCard = function () {
    if (card) {
      card.remove();

      cardClose.removeEventListener('click', closeCard);
      document.removeEventListener('keydown', onCardEscPress);
      document.removeEventListener('keydown', onCardEnterPress);
    }
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
    card = pins.insertAdjacentElement('afterEnd', window.card.createCard(ad));
    cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscPress);
    document.removeEventListener('keydown', onCardEnterPress);
  };

  window.map = {
    pins: pins,
    openCard: openCard,
    closeCard: closeCard
  };
})();
