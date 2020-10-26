import {openFullscreenPopup} from './index.js'

class Card {
  constructor(data, selector) {
    this._name = data.name
    this._link = data.link
    this._selector = selector
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true).children[0]
  }

  _deleteHandler() {
    this._element.remove()
  }

  _likeHandler() {
    this._element.querySelector('.card__heart-btn').classList.toggle('card__heart-btn_active')
    console.log(this._element.querySelector('.card__heart-btn'))
  }

  

  _setListeners() {
    this._element.querySelector('.card__trash-btn').addEventListener('click', () => this._deleteHandler())
    this._element.querySelector('.card__heart-btn').addEventListener('click', ()=> this._likeHandler())
    this._element.querySelector('.card__img').addEventListener('click', openFullscreenPopup)
  }

  getElement() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').innerText = this._name;
    this._element.querySelector('.card__img').setAttribute('src', this._link);
    this._element.querySelector('.card__img').setAttribute('alt', this._name);

    this._setListeners();

    return this._element
  }
}

export default Card