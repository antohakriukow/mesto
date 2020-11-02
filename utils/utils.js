export const config = {
  //cardArea: document.querySelector('.card-items'), // Блок с карточками
  // userName: document.querySelector('.user__name'), // Имя пользователя
  // userAbout: document.querySelector('.user__about'), // Описание пользователя
  userEditBtn: document.querySelector('.user__edit-btn'), // Кнопка редактирования инфонмации о пользователе
  placeAddBtn: document.querySelector('.user__add-btn'), // Кнопка добавления карточки

  userPopup: document.querySelector('.popup_user'), // Попап User
  placePopup: document.querySelector('.popup_place'), // Попап Place
  fullscreenPopup: document.querySelector('.fullscreen-popup'), // Фуллскрин попап

  // popupUserTitle: document.querySelector('.popup__title_user-window'), // Название попапа с информацией о пользователе
  popupNameInput: document.querySelector('.popup__input-field_name'), // Поле ввода имени пользователя
  popupAboutInput: document.querySelector('.popup__input-field_about'), // Поле ввода информации о пользователе

  // popupPlaceTitle: document.querySelector('.popup__title_place-window'), // Название попапа с информацией о карточке
  // popupPlaceNameInput: document.querySelector('.popup__input-field_place-name'), // Поле ввода названия карточки
  // popupPlaceUrlInput: document.querySelector('.popup__input-field_place-url'), // Поле ввода URL карточки
  
  cardTemplate: '.card-template',

  popupInputFieldErrorActive: 'popup__input-field-error_active',
  popupInputFieldError: 'popup__input-field_error',
  popupSubmitBtnDisabled: 'popup__submit-btn_disabled',

  formInputSelector: '.popup__input-field',
  formSubmitSelector: '.popup__submit-btn',
  cardAreaSelector: '.card-items',
}