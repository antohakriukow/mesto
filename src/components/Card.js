export default class Card {
  constructor(data, selector, cardOptions, handleDeleteButtonClick, userId) {
    this._place = data.name
    this._url = data.link
    this._cardId = data._id
    this._cardOwnerId = data.owner._id
    this._likeQuanity = data.likes.length
    this._likes = data.likes
    this._userId = userId
    this._selector = selector
    this._handleCardClick = cardOptions.handleCardClick
    this._setLike = cardOptions.setLike
    this._removeLike = cardOptions.removeLike
    this._handleCardRemove = cardOptions.handleCardRemove
    // this._showAlertPopup = cardOptions.showAlertPopup
    this._handleDeleteButtonClick = handleDeleteButtonClick
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).querySelector('.card')
  }

  getIdForDelete(evt) {
    return (`id for delete = ${evt.path[2].id}`)
  }

  handleDelete() {
    this._element.remove()
    this._element = null
  }

  _handleLike() {
    if (this._likes.find(el => el._id == this._userId) === undefined) {
      this._setLike(this._element.id)
        .then((res) => {
          this._element.querySelector('.card__like-counter').innerText = res.likes.length
          this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
          this._likes = res.likes
        })
    } else {
      this._removeLike(this._element.id)
        .then((res) => {
          this._element.querySelector('.card__like-counter').innerText = res.likes.length
          this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
          this._likes = res.likes
        })
    }
  }

  _setListeners() {
    if (this._cardDeleteBtn !== null) {
      this._element.querySelector('.card__trash-btn').addEventListener('click', () => {
        this._handleDeleteButtonClick(this)
      })
    }
    this._element.querySelector('.card__heart-btn').addEventListener('click', ()=> this._handleLike())
    this._element.querySelector('.card__img').addEventListener('click', () => this._handleCardClick(this._place, this._url))
  }

  getElement() {
    this._element = this._getTemplate();
    this._cardDeleteBtn = this._element.querySelector('.card__trash-btn')
    const img = this._element.querySelector('.card__img')

    this._element.querySelector('.card__title').innerText = this._place
    img.setAttribute('src', this._url)
    img.setAttribute('alt', this._place)
    this._element.setAttribute('id', this._cardId)
    this._element.querySelector('.card__like-counter').innerText = this._likeQuanity

    if (this._userId !== this._cardOwnerId) {
      this._cardDeleteBtn.remove()
      this._cardDeleteBtn = null
    }

    if (this._likes.find(el => el._id == this._userId) !== undefined) {
      this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
    }

    this._setListeners()

    return this._element
  }
}