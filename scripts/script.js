const initialCards = [
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
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

let cardTemplate = document.querySelector('.card-template');
let cardArea = document.querySelector('.card-items');
let userSection = document.querySelector('.user');
let userName = userSection.querySelector('.user__name');
let userAbout = userSection.querySelector('.user__about');
let userEditBtn = userSection.querySelector('.user__edit-btn');
let placeAddBtn = userSection.querySelector('.user__add-btn');

let popupSection = document.querySelector('.popup');
let userPopupInputs = popupSection.querySelectorAll('.popup__input-field_user-window');
let placePopupInputs = popupSection.querySelectorAll('.popup__input-field_place-window');
let popupUserTitle = popupSection.querySelector('.popup__title_user-window');
let popupPlaceTitle = popupSection.querySelector('.popup__title_place-window');
let popupNameInput = popupSection.querySelector('.popup__input-field_name');
let popupAboutInput = popupSection.querySelector('.popup__input-field_about');
let popupPlaceNameInput = popupSection.querySelector('.popup__input-field_place-name');
let popupPlaceUrlInput = popupSection.querySelector('.popup__input-field_place-url');
let popupForm = popupSection.querySelector('.popup__input-container');
let popupCloseBtn = popupSection.querySelector ('.popup__close-btn');

function popupOpen(evt) {
  if (popupSection.classList.contains('popup_opened') === false && evt.target === userEditBtn) {
    popupNameInput.value = userName.textContent;
    popupAboutInput.value = userAbout.textContent;
    popupUserTitle.classList.add('show');
    popupNameInput.classList.add('show');
    popupAboutInput.classList.add('show');
  }
  if (popupSection.classList.contains('popup_opened') === false && evt.target === placeAddBtn) {
    popupPlaceTitle.classList.add('show');
    popupPlaceNameInput.classList.add('show');
    popupPlaceUrlInput.classList.add('show');
  }
  popupSection.classList.add('popup_opened');
}

function popupClose(evt) {
  popupPlaceTitle.classList.remove('show');
  popupPlaceNameInput.classList.remove('show');
  popupPlaceUrlInput.classList.remove('show');
  popupUserTitle.classList.remove('show');
  popupNameInput.classList.remove('show');
  popupAboutInput.classList.remove('show');
  popupSection.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = popupNameInput.value;
  userAbout.textContent = popupAboutInput.value;

  popupClose();
}

userEditBtn.addEventListener('click', popupOpen);
placeAddBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
popupForm.addEventListener('submit', formSubmitHandler);