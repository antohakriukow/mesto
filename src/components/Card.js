export default class Card {
  constructor(data, selector, handleCardClick) {
    this._place = data.place
    this._url = data.url
    this._selector = selector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).querySelector('.card')
  }

  _handleDelete() {
    this._element.remove()
    this._element = null
  }

  _handleLike() {
    this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
  }

  _setListeners() {
    this._element.querySelector('.card__trash-btn').addEventListener('click', () => this._handleDelete())
    this._element.querySelector('.card__heart-btn').addEventListener('click', ()=> this._handleLike())
    this._element.querySelector('.card__img').addEventListener('click', () => this._handleCardClick())
  }

  getElement() {
    this._element = this._getTemplate();
    const img = this._element.querySelector('.card__img')

    this._element.querySelector('.card__title').innerText = this._place;
    img.setAttribute('src', this._url);
    img.setAttribute('alt', this._place);

    this._setListeners();

    return this._element
  }
}