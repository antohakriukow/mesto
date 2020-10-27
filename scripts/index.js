import {initialCards, config} from './config.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'


initialCards.forEach((data) => {
  const card = new Card(data, config.cardTemplate)
  const element = card.getElement()
  
  config.cardArea.prepend(element)
})

// Функция открытия попапа
function openPopup(popup) {
  document.querySelector('.body').classList.add('body_noscroll')
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupWithEscBtn)
}

// Открытие попапа User
function openUserPopup() {
  config.popupNameInput.value = config.userName.textContent
  config.popupAboutInput.value = config.userAbout.textContent
  openPopup(config.userPopup)
}

// Открытие попапа Place
function openPlacePopup() {
  openPopup(config.placePopup)
}

// Открытие попапа Fullscreen
export function openFullscreenPopup(evt) {
  const clickedImg = evt.target.getAttribute('src')
  const clickedPlace = evt.target.getAttribute('alt')
  if (!config.fullscreenPopup.classList.contains('popup_opened')) {
    config.fullscreenPopup.querySelector('.fullscreen-popup__img').setAttribute('src', clickedImg)
    config.fullscreenPopup.querySelector('.fullscreen-popup__img').setAttribute('alt', clickedPlace)
    config.fullscreenPopup.querySelector('.fullscreen-popup__title').innerText = clickedPlace
  }
  openPopup(config.fullscreenPopup)
}

// Закрытие попапов
function closePopup() {
  const popups = [config.userPopup, config.placePopup, config.fullscreenPopup]
  popups.forEach((popup) => {popup.classList.remove('popup_opened')})
  document.querySelector('.body').classList.remove('body_noscroll')
  document.removeEventListener('keydown', closePopupWithEscBtn)
}

// Закрытие попапов с помощью Esc
function closePopupWithEscBtn(evt) {
  if (evt.key === 'Escape') {
    closePopup()
  }
}

// Закрытие попапов при клике на оверлэй
function closePopupByClickOnOverlay(evt) {
  if (evt.target !== evt.currentTarget) {
    return
  }
  closePopup()
}

// Обработчик User
function handleUserFormSubmit(evt) {
  evt.preventDefault()
  config.userName.textContent = config.popupNameInput.value
  config.userAbout.textContent = config.popupAboutInput.value
  closePopup()
}

// Обработчик Place
function handlePlaceFormSubmit(evt) {
  const newData = {}
  newData.name = config.popupPlaceNameInput.value
  newData.link = config.popupPlaceUrlInput.value

  const card = new Card(newData, config.cardTemplate)
  const element = card.getElement()
  
  config.cardArea.prepend(element)
  config.popupPlaceNameInput.value = config.popupPlaceUrlInput.value = ''
  closePopup()
}

// Listeners
(function setListeners() {
  config.userEditBtn.addEventListener('click', openUserPopup)
  config.placeAddBtn.addEventListener('click', openPlacePopup)
  config.userPopup.querySelector('.popup__input-container').addEventListener('submit', handleUserFormSubmit)
  config.placePopup.querySelector('.popup__input-container').addEventListener('submit', handlePlaceFormSubmit)
  document.querySelectorAll('.popup__close-btn').forEach((btn) => {
    btn.addEventListener('click', closePopup)
  })
  
  config.userPopup.addEventListener('click', closePopupByClickOnOverlay)
  config.placePopup.addEventListener('click', closePopupByClickOnOverlay)
  config.fullscreenPopup.addEventListener('click', closePopupByClickOnOverlay)
})()

const userFormValidator = new FormValidator(config, config.userPopup)
userFormValidator.enableValidation()

const placeFormValidator = new FormValidator(config, config.placePopup)
placeFormValidator.enableValidation()