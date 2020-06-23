'use strict';

(function () {
  // Попап
  var card;
  var cardClose;
  var pins = document.querySelector('.map__pins');

  // Закрывает попап
  var closeCard = function () {
    card.remove();

    cardClose.removeEventListener('click', closeCard);
    document.removeEventListener('keydown', onCardEscEnterPress);
  };

  var onCardEscEnterPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Enter') {
      closeCard();
    }
  };

  // Открывает попап (показывает объявление)
  var openCard = function (ad) {
    if (card) {
      closeCard();
    }
    // console.log(window.cardAdverts.createCard(ad));
    card = pins.insertAdjacentElement('afterEnd', window.card.createCard(ad));
    cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardEscEnterPress);
  };

  window.map = {
    pins: pins,
    openCard: openCard
  };
})();
