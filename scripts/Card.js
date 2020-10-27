import {openFullscreenPopup} from './index.js'
const like = document.querySelector('.card__heart-btn')

class Card {
  constructor(data, selector) {
    this._name = data.name
    this._link = data.link
    this._selector = selector
    this._like = like
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).children[0]
  }

  _handleDelete() {
    this._element.remove()
  }

  _handleLike() {
    this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
  }

  

  _setListeners() {
    this._element.querySelector('.card__trash-btn').addEventListener('click', () => this._handleDelete())
    this._element.querySelector('.card__heart-btn').addEventListener('click', ()=> this._handleLike())
    this._element.querySelector('.card__img').addEventListener('click', openFullscreenPopup)
  }

  getElement() {
    this._element = this._getTemplate();
    const img = this._element.querySelector('.card__img')

    this._element.querySelector('.card__title').innerText = this._name;
    img.setAttribute('src', this._link);
    img.setAttribute('alt', this._name);

    this._setListeners();

    return this._element
  }
}

export default Card