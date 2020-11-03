export const config = {
  userEditBtn: document.querySelector('.user__edit-btn'), // Кнопка редактирования инфонмации о пользователе
  placeAddBtn: document.querySelector('.user__add-btn'), // Кнопка добавления карточки

  userPopup: document.querySelector('.popup_user'), // Попап User
  placePopup: document.querySelector('.popup_place'), // Попап Place
  fullscreenPopup: document.querySelector('.fullscreen-popup'), // Фуллскрин попап

  popupNameInput: document.querySelector('.popup__input-field_name'), // Поле ввода имени пользователя
  popupAboutInput: document.querySelector('.popup__input-field_about'), // Поле ввода информации о пользователе
  
  cardTemplate: '.card-template',

  popupInputFieldErrorActive: 'popup__input-field-error_active',
  popupInputFieldError: 'popup__input-field_error',
  popupSubmitBtnDisabled: 'popup__submit-btn_disabled',

  formInputSelector: '.popup__input-field',
  formSubmitSelector: '.popup__submit-btn',
  cardAreaSelector: '.card-items',
}