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

  document.querySelectorAll('.card__trash-btn').forEach((btn) => {
    btn.addEventListener('click', deleteCard);
  });
  document.querySelectorAll('.card__heart-btn').forEach((btn) => {
    btn.addEventListener('click', likeCard);
  });
  document.querySelectorAll('.card__img').forEach((img) => {
    img.addEventListener('click', FullscreenPopupOpen);
  });
}

// Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// Лайк
function likeCard(evt) {
  evt.target.classList.toggle('card__heart-btn_active');
}

// Открытие попапа User
function userPopupOpen() {
  popupNameInput.value = userName.textContent;
  popupAboutInput.value = userAbout.textContent;
  document.querySelector('.body').classList.add('body_noscroll');
  userPopup.classList.add('popup_opened');
}

// Открытие попапа Place
function placePopupOpen() {
  document.querySelector('.body').classList.add('body_noscroll');
  placePopup.classList.add('popup_opened');
}

// Открытие попапа Fullscreen
function FullscreenPopupOpen(evt) {
  const popup = document.querySelector('.fullscreen-popup');
  const clickedImg = evt.target.getAttribute('src');
  const clickedPlace = evt.target.getAttribute('alt');
  if (popup.classList.contains('popup_opened') === false) {
    document.querySelector('.fullscreen-popup__img').setAttribute('src', clickedImg);
    document.querySelector('.fullscreen-popup__img').setAttribute('alt', clickedPlace);
    document.querySelector('.fullscreen-popup__title').innerText = clickedPlace;
  }
  popup.classList.add('popup_opened');
}

// Закрытие попапов
function popupClose() {
  userPopup.classList.remove('popup_opened');
  placePopup.classList.remove('popup_opened');
  fullscreenPopup.classList.remove('popup_opened');
  document.querySelector('.body').classList.remove('body_noscroll');
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
}