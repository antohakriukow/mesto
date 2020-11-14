import './index.css'
import {config} from '../utils/utils.js'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Section from '../components/Section.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithBtn from '../components/PopupWithBtn.js'

const cardOptions = {

  handleCardClick: (name, link) => fullscreenPopupInstance.open(name, link),   //Callback-function for fullscreen popup

  renderCards: () => {   //Rendering cards from server
    api.getInitialCards()
      .then((data) => cardsList.renderItems(data))
      .catch((err) => console.log(err))
  },

  addNewCard: (evt, inputValues) => {   //Adding new card
    evt.preventDefault()
    const card = {name: inputValues.place, link: inputValues.url,}
    api.addCard(card)
    .then((card) => {
      createCard(card)
      placePopupInstance.close()
    })
    .catch((err) => console.log(err))
  },

  setLike: (id) => api.likeCard(id).catch((err) => err),

  removeLike: (id) => api.dislikeCard(id).catch((err) => err),

  showAlertPopup: () => popupwithBtnInstance.open(),

  handlePlacePopupBtn: () => {
    placeFormValidator.toggleButtonState()
    placePopupInstance.open()
  }
}

const userOptions = {
  getUserId: () => api.getUserData()   // Getting user ID from server
    .then((data) => userId = data._id)
    .catch((err) => console.log(err)),
  
  getUser: () => api.getUserData()   // Getting username & info about user from server
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about)
      userInfo.setUserAvatar(data.avatar)
    })
    .catch((err) => console.log(err)),

  changeUser: (evt, inputValues) => {   // Change username & info about user on server & local
    evt.preventDefault()

    showProcessing(true)
    api.setUserData(inputValues)
      .then((inputValues) => {
        userInfo.setUserInfo(inputValues.name, inputValues.about)
        userPopupInstance.close()
      })
      .catch((err) => console.log(err))
      .finally(() => showProcessing(false))
  },

  handleUserPopupBtn: () => {   //Callback-function for user-popup
    const userData = userInfo.getUserInfo()
    config.popupNameInput.value = userData.name
    config.popupAboutInput.value = userData.about
    userPopupInstance.open()
  },

  changeAvatar: (evt, inputValue) => {
    evt.preventDefault()
    showProcessing(true)
    api.setUserAvatar(inputValue)
      .then((inputValue)=> {
      userInfo.setUserAvatar(inputValue.avatar)
      PopupWithAvatarInstance.close()
    })
    .catch((err) => console.log(err))
    .finally(() => showProcessing(false)) 
  },
  
  handleAvatarBtn: () => {
    const userAvatar = userInfo.getuserAvatar()
    config.popupAvatarInput.value = userAvatar
    avatarFormValidator.toggleButtonState()
    PopupWithAvatarInstance.open()
  }
}

function showProcessing(processing) {
  if (processing) {
      Array.from(config.smartSubmitters).forEach((submit) => {
          submit.value = "Сохранение...";
      })
  } else {
      Array.from(config.smartSubmitters).forEach((submit) => {
          submit.value = "Сохранить";
      })
  }
}

const popupwithBtnInstance = new PopupWithBtn(config.deleteAlertPopup)
popupwithBtnInstance.setEventListeners()

function handleDeleteButtonClick(card) {
  
  popupwithBtnInstance.open()
  popupwithBtnInstance.setSubmitFunction(() => {
    api.removeCard(card._cardId)
      .then(() => {
        card.handleDelete()
        popupwithBtnInstance.close()
      })

  })
}


const createCard = (item) => {   //Creating card method
  const card = new Card(item, config.cardTemplate, cardOptions, handleDeleteButtonClick, userId)
  const element = card.getElement()
  cardsList.addItem(element)
}

const api = new Api({
  url: `${config.mestoUrl}/${config.mestoCohortId}`,
  headers: {'Content-Type': "application/json", authorization: config.mestoToken,}
})

const cardsList = new Section({
  items: api.getInitialCards().then((data) => data),
  renderer: item => {createCard(item)}},
  config.cardAreaSelector
)

const userInfo = new UserInfo({name: '.user__name', about: '.user__about', avatar: '.user__photo'})
const userFormValidator = new FormValidator(config, config.userPopup)
userFormValidator.enableValidation()


const fullscreenPopupInstance = new PopupWithImage(config.fullscreenPopup)
fullscreenPopupInstance.setEventListeners()

const userPopupInstance = new PopupWithForm(config.userPopup, userOptions.changeUser)
userPopupInstance.setEventListeners()

const placePopupInstance = new PopupWithForm(config.placePopup, cardOptions.addNewCard)
placePopupInstance.setEventListeners()

const placeFormValidator = new FormValidator(config, config.placePopup)
placeFormValidator.enableValidation()

const PopupWithAvatarInstance = new PopupWithForm(config.avatarPopup, userOptions.changeAvatar)
PopupWithAvatarInstance.setEventListeners()

const avatarFormValidator = new FormValidator(config, config.avatarPopup)
avatarFormValidator.enableValidation()

config.userEditBtn.addEventListener('click', userOptions.handleUserPopupBtn)
config.placeAddBtn.addEventListener('click', cardOptions.handlePlacePopupBtn)
config.changeAvatarBtn.addEventListener('click', userOptions.handleAvatarBtn)


let userId = ''
userOptions.getUserId()
cardOptions.renderCards()
userOptions.getUser()