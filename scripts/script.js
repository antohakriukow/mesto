// Массив с исходными данными для карточек
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
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
}
];

const cardArea = document.querySelector('.card-items'); // Блок с карточками
const userName = document.querySelector('.user__name'); // Имя пользователя
const userAbout = document.querySelector('.user__about'); // Описание пользователя
const userEditBtn = document.querySelector('.user__edit-btn'); // Кнопка редактирования инфонмации о пользователе
const placeAddBtn = document.querySelector('.user__add-btn'); // Кнопка добавления карточки

const userPopup = document.querySelector('.popup_user'); // Попап
const placePopup = document.querySelector('.popup_place'); // Попап
const fullscreenPopup = document.querySelector('.fullscreen-popup'); // Фуллскрин попап

const popupUserTitle = userPopup.querySelector('.popup__title_user-window'); // Название попапа с информацией о пользователе
const popupNameInput = userPopup.querySelector('.popup__input-field_name'); // Поле ввода имени пользователя
const popupAboutInput = userPopup.querySelector('.popup__input-field_about'); // Поле ввода информации о пользователе

const popupPlaceTitle = placePopup.querySelector('.popup__title_place-window'); // Название попапа с информацией о карточке
const popupPlaceNameInput = placePopup.querySelector('.popup__input-field_place-name'); // Поле ввода названия карточки
const popupPlaceUrlInput = placePopup.querySelector('.popup__input-field_place-url'); // Поле ввода URL карточки
const cardTemplate = document.querySelector('.card-template');

const popups = [userPopup, placePopup, fullscreenPopup];

// Перебор массива
(function render() {
  cardArea.innerHTML = '';
  initialCards.forEach(renderItem);
})();

setListeners();

// Создание карточки
function renderItem(card) {
  const htmlElement = cardTemplate.content.cloneNode(true);
  const title = htmlElement.querySelector('.card__title');
  htmlElement.querySelector('.card__title').innerText = card.name;
  htmlElement.querySelector('.card__img').setAttribute('src', card.link);
  htmlElement.querySelector('.card__img').setAttribute('alt', card.name);
  cardArea.prepend(htmlElement);

  document.querySelector('.card__trash-btn').addEventListener('click', deleteCard);
  document.querySelector('.card__heart-btn').addEventListener('click', likeCard);
  document.querySelector('.card__img').addEventListener('click', fullscreenPopupOpen);
}

// Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// Лайк
function likeCard(evt) {
  evt.target.classList.toggle('card__heart-btn_active');
}

// Функция открытия попапа
function popupOpen(popup) {
  document.querySelector('.body').classList.add('body_noscroll');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupCloseWithEscBtn);
}

// Открытие попапа User
function userPopupOpen() {
  popupNameInput.value = userName.textContent;
  popupAboutInput.value = userAbout.textContent;
  popupOpen(userPopup);
}

// Открытие попапа Place
function placePopupOpen() {
  popupOpen(placePopup);
}

// Открытие попапа Fullscreen
function fullscreenPopupOpen(evt) {
  const clickedImg = evt.target.getAttribute('src');
  const clickedPlace = evt.target.getAttribute('alt');
  if (fullscreenPopup.classList.contains('popup_opened') === false) {
    fullscreenPopup.querySelector('.fullscreen-popup__img').setAttribute('src', clickedImg);
    fullscreenPopup.querySelector('.fullscreen-popup__img').setAttribute('alt', clickedPlace);
    fullscreenPopup.querySelector('.fullscreen-popup__title').innerText = clickedPlace;
  }
  popupOpen(fullscreenPopup);
}

// Закрытие попапов
function popupClose() {
  popups.forEach((popup) => {popup.classList.remove('popup_opened')});
  document.querySelector('.body').classList.remove('body_noscroll');
  document.removeEventListener('keydown', popupCloseWithEscBtn);
}

// Закрытие попапов с помощью Esc
function popupCloseWithEscBtn(evt) {
  if (evt.key === 'Escape') {
    popupClose();
  }
}

// Закрытие попапов при клике на оверлэй
function popupCloseByClickOnOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  popupClose();
}

// Обработчик User
function userFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = popupNameInput.value;
  userAbout.textContent = popupAboutInput.value;
  popupClose();
}

// Обработчик Place
function placeFormSubmitHandler(evt) {
  evt.preventDefault();
  const name = popupPlaceNameInput.value;
  const link = popupPlaceUrlInput.value;   
  initialCards.unshift({name, link});
  renderItem(initialCards[0]);
  popupClose();
}

// Listeners
function setListeners() {
  userEditBtn.addEventListener('click', userPopupOpen);
  placeAddBtn.addEventListener('click', placePopupOpen);
  userPopup.querySelector('.popup__input-container').addEventListener('submit', userFormSubmitHandler);
  placePopup.querySelector('.popup__input-container').addEventListener('submit', placeFormSubmitHandler);
  document.querySelectorAll('.popup__close-btn').forEach((btn) => {
    btn.addEventListener('click', popupClose);
  });
  
  userPopup.addEventListener('click', popupCloseByClickOnOverlay);
  placePopup.addEventListener('click', popupCloseByClickOnOverlay);
  fullscreenPopup.addEventListener('click', popupCloseByClickOnOverlay);
}