export const config = {
  userEditBtn: document.querySelector('.user__edit-btn'), // Кнопка редактирования инфонмации о пользователе
  placeAddBtn: document.querySelector('.user__add-btn'), // Кнопка добавления карточки
  changeAvatarBtn: document.querySelector('.user__overlay'), // Кнопка изменения аватара

  userPopup: document.querySelector('.popup_user'), // Попап User
  placePopup: document.querySelector('.popup_place'), // Попап Place
  fullscreenPopup: document.querySelector('.fullscreen-popup'), // Фуллскрин попап
  deleteAlertPopup: document.querySelector('.popup_delete-alert'), // Попап с запросом на удаление карточки
  avatarPopup: document.querySelector('.popup_avatar'), // Попап обновления аватара

  popupNameInput: document.querySelector('.popup__input-field_name'), // Поле ввода имени пользователя
  popupAboutInput: document.querySelector('.popup__input-field_about'), // Поле ввода информации о пользователе
  popupAvatarInput: document.querySelector('.popup__input-field_avatar'), // Поле ввода ссылки на аватар
  smartSubmitters: document.querySelectorAll('.js-smartSubmitter'), // Умные сабмиттеры
  
  cardTemplate: '.card-template',

  popupInputFieldErrorActive: 'popup__input-field-error_active',
  popupInputFieldError: 'popup__input-field_error',
  popupSubmitBtnDisabled: 'popup__submit-btn_disabled',

  formInputSelector: '.popup__input-field',
  formSubmitSelector: '.popup__submit-btn',
  cardAreaSelector: '.card-items',

  mestoUrl: 'https://mesto.nomoreparties.co/v1',
  mestoCohortId: 'cohort-17',
  mestoToken: 'c13b61bb-48e3-443e-a9a7-26bfb3cb5657',
}