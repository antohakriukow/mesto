export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

export const config = {
  cardArea: document.querySelector('.card-items'), // Блок с карточками
  userName: document.querySelector('.user__name'), // Имя пользователя
  userAbout: document.querySelector('.user__about'), // Описание пользователя
  userEditBtn: document.querySelector('.user__edit-btn'), // Кнопка редактирования инфонмации о пользователе
  placeAddBtn: document.querySelector('.user__add-btn'), // Кнопка добавления карточки

  userPopup: document.querySelector('.popup_user'), // Попап
  placePopup: document.querySelector('.popup_place'), // Попап
  fullscreenPopup: document.querySelector('.fullscreen-popup'), // Фуллскрин попап

  popupUserTitle: document.querySelector('.popup__title_user-window'), // Название попапа с информацией о пользователе
  popupNameInput: document.querySelector('.popup__input-field_name'), // Поле ввода имени пользователя
  popupAboutInput: document.querySelector('.popup__input-field_about'), // Поле ввода информации о пользователе

  popupPlaceTitle: document.querySelector('.popup__title_place-window'), // Название попапа с информацией о карточке
  popupPlaceNameInput: document.querySelector('.popup__input-field_place-name'), // Поле ввода названия карточки
  popupPlaceUrlInput: document.querySelector('.popup__input-field_place-url'), // Поле ввода URL карточки
  cardTemplate: '.card-template',


  popupInputFieldErrorActive: 'popup__input-field-error_active', //formInputErrorActiveClass
  popupInputFieldError: 'popup__input-field_error',
  popupSubmitBtnDisabled: 'popup__submit-btn_disabled', //formInputErrorInactiveClass

  formInputSelector: '.popup__input-field', //formInputSelector
  formSubmitSelector: '.popup__submit-btn', //formSubmitSelector
}