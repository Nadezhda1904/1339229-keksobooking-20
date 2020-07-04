'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  var photoPreviewImage = document.createElement('img');
  var defaultAvatar = avatarPreview.getAttribute('src');

  photoPreviewImage.style.width = '70px';
  photoPreviewImage.style.height = '70px';
  photoPreview.append(photoPreviewImage);

  var clearPhotoPreview = function () {
    var image = photoPreview.querySelector('img');
    if (image) {
      image.remove();
    }
  };

  var clearAvatarPreview = function () {
    if (avatarPreview) {
      avatarPreview.src = defaultAvatar;
    }
  };

  var loadPreview = function (input, element) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var onAvatarFileChooserChange = function () {
    loadPreview(avatarFileChooser, avatarPreview);
  };

  var onPhotoFileChooserChange = function () {
    loadPreview(photoFileChooser, photoPreviewImage);
  };

  var activateLoadImg = function () {
    avatarFileChooser.addEventListener('change', onAvatarFileChooserChange);
    photoFileChooser.addEventListener('change', onPhotoFileChooserChange);
  };

  var disableLoadImg = function () {
    avatarFileChooser.removeEventListener('change', onAvatarFileChooserChange);
    photoFileChooser.removeEventListener('change', onPhotoFileChooserChange);
    clearPhotoPreview();
    clearAvatarPreview();
  };

  window.previewImage = {
    activateLoadImg: activateLoadImg,
    disableLoadImg: disableLoadImg,
  };
})();
