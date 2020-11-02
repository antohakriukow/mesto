import {initialCards} from '../utils/constants.js'
import {config} from '../utils/utils.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'

//Cards + Fullscreen Popup
const fullscreenPopupInstance = new PopupWithImage(config.fullscreenPopup)
fullscreenPopupInstance.setEventListeners()

function createCard (item) {
  const card = new Card(item, config.cardTemplate, () => fullscreenPopupInstance.open(item))
    const element = card.getElement()
    cardsList.addItem(element)
}

const cardsList = new Section({
  items: initialCards,
  renderer: item => {createCard(item)}},
  config.cardAreaSelector
)

cardsList.renderItems();

//user Popup
const userInfo = new UserInfo({name: '.user__name', about: '.user__about'})
const userFormValidator = new FormValidator(config, config.userPopup)
userFormValidator.enableValidation()


const userPopupInstance = new PopupWithForm(config.userPopup, (evt, inputValues) =>{
  evt.preventDefault()

  userInfo.setUserInfo(inputValues.name, inputValues.about)
  userPopupInstance.close()
})

userPopupInstance.setEventListeners()

function handleUserPopupBtn() {
  const userData = userInfo.getUserInfo()
  config.popupNameInput.value = userData.name
  config.popupAboutInput.value = userData.about
  userPopupInstance.open()
}

config.userEditBtn.addEventListener('click', handleUserPopupBtn)

//place Popup
const placeFormValidator = new FormValidator(config, config.placePopup)
placeFormValidator.enableValidation()

const placePopupInstance = new PopupWithForm(config.placePopup, (evt, inputValues) =>{
  evt.preventDefault()
  
  createCard(inputValues)
  placePopupInstance.close()
})

placePopupInstance.setEventListeners()

function handlePlacePopupBtn() {
  placePopupInstance.open()
}

config.placeAddBtn.addEventListener('click', handlePlacePopupBtn)