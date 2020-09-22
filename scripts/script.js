// Массив с исходными данными для карточек
let initialCards = [
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

  let cardArea = document.querySelector('.card-items'); // Блок с карточками
  let userName = document.querySelector('.user__name'); // Имя пользователя
  let userAbout = document.querySelector('.user__about'); // Описание пользователя
  let userEditBtn = document.querySelector('.user__edit-btn'); // Кнопка редактирования инфонмации о пользователе
  let placeAddBtn = document.querySelector('.user__add-btn'); // Кнопка добавления карточки
  let popupSection = document.querySelector('.popup'); // Попап
  let fullscreenPopup = document.querySelector('.fullscreen-popup'); // Фуллскрин попап

  let popupUserTitle = popupSection.querySelector('.popup__title_user-window'); // Название попапа с информацией о пользователе
  let popupPlaceTitle = popupSection.querySelector('.popup__title_place-window'); // Название попапа с информацией о карточке
  let popupNameInput = popupSection.querySelector('.popup__input-field_name'); // Поле ввода имени пользователя
  let popupAboutInput = popupSection.querySelector('.popup__input-field_about'); // Поле ввода информации о пользователе
  let popupPlaceNameInput = popupSection.querySelector('.popup__input-field_place-name'); // Поле ввода названия карточки
  let popupPlaceUrlInput = popupSection.querySelector('.popup__input-field_place-url'); // Поле ввода URL карточки

// Перебор массива
(function render() {
  cardArea.innerHTML = '';
  initialCards.forEach(renderItem);
})();

// Добавление карточки
function renderItem(card) {
  const htmlElement = document.querySelector('.card-template').content.cloneNode(true);
  const title = htmlElement.querySelector('.card__title');
  htmlElement.querySelector('.card__title').innerText = card.name;
  htmlElement.querySelector('.card__img').setAttribute('src', card.link);
  htmlElement.querySelector('.card__img').setAttribute('alt', card.name);
  cardArea.prepend(htmlElement);
  setListeners();
}

// Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// Лайк
function likeCard(evt) {
  evt.target.classList.toggle('card__heart-btn_active');
}

// Открытие попапа с полями ввода
function popupOpen(evt) {
  if (popupSection.classList.contains('popup_visible') === false && evt.target === userEditBtn) {
    popupNameInput.value = userName.textContent;
    popupAboutInput.value = userAbout.textContent;
    popupUserTitle.classList.add('popup_opened');
    popupNameInput.classList.add('popup_opened');
    popupAboutInput.classList.add('popup_opened');
  }
  if (popupSection.classList.contains('popup_visible') === false && evt.target === placeAddBtn) {
    popupPlaceTitle.classList.add('popup_opened');
    popupPlaceNameInput.classList.add('popup_opened');
    popupPlaceUrlInput.classList.add('popup_opened');
  }
  document.querySelector('.body').classList.add('body_noscroll');
  popupSection.classList.add('popup_visible');
}

// Открытие попапа просмотра изображения
function openFullscreen(evt) {
  const popup = document.querySelector('.fullscreen-popup');
  const clickedImg = evt.target.getAttribute('src');
  const clickedPlace = evt.target.getAttribute('alt');
  if (popup.classList.contains('popup_visible') === false) {
    document.querySelector('.fullscreen-popup__img').setAttribute('src', clickedImg);
    document.querySelector('.fullscreen-popup__img').setAttribute('alt', clickedPlace);
    document.querySelector('.fullscreen-popup__title').innerText = clickedPlace;
  }
  popup.classList.add('popup_visible');
}

// Закрытие попапов
function popupClose(evt) {
  popupPlaceTitle.classList.remove('popup_opened');
  popupPlaceNameInput.classList.remove('popup_opened');
  popupPlaceUrlInput.classList.remove('popup_opened');

  popupUserTitle.classList.remove('popup_opened');
  popupNameInput.classList.remove('popup_opened');
  popupAboutInput.classList.remove('popup_opened');

  popupSection.classList.remove('popup_visible');
  fullscreenPopup.classList.remove('popup_visible');
  document.querySelector('.body').classList.remove('body_noscroll');
}

// Обработчик отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  if (popupUserTitle.classList.contains('popup_opened') === true) {
    userName.textContent = popupNameInput.value;
    userAbout.textContent = popupAboutInput.value;
  }
  if (popupPlaceTitle.classList.contains('popup_opened') === true) {
    const name = popupPlaceNameInput.value;
    const link = popupPlaceUrlInput.value;   
    initialCards.unshift({name, link});
    renderItem(initialCards[0]);
  }

  popupClose();
}

// Listeners
function setListeners() {
  userEditBtn.addEventListener('click', popupOpen);
  placeAddBtn.addEventListener('click', popupOpen);
  popupSection.querySelector('.popup__input-container').addEventListener('submit', formSubmitHandler);
  document.querySelectorAll('.popup__close-btn').forEach((btn) => {
    btn.addEventListener('click', popupClose);
  });
  document.querySelectorAll('.card__trash-btn').forEach((btn) => {
    btn.addEventListener('click', deleteCard);
  });
  document.querySelectorAll('.card__heart-btn').forEach((btn) => {
    btn.addEventListener('click', likeCard);
  });
  document.querySelectorAll('.card__img').forEach((img) => {
    img.addEventListener('click', openFullscreen);
  });
}