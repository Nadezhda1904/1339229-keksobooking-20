'use strict';

(function () {
  // Попап
  var popup;
  var popupClose;
  var pins = document.querySelector('.map__pins');

  // Закрывает попап
  var closePopup = function () {
    popup.remove();

    popupClose.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscEnterPress);
  };

  var onPopupEscEnterPress = function (evt) {
    if (evt.key === 'Escape' || evt.key === 'Enter') {
      closePopup();
    }
  };

  // Открывает попап (показывает объявление)
  var openPopup = function (ad) {
    if (popup) {
      closePopup();
    }
    popup = pins.insertAdjacentElement('afterEnd', window.card.createCard(ad));
    popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscEnterPress);
  };

  window.map = {
    pins: pins,
    openPopup: openPopup
  };
})();
