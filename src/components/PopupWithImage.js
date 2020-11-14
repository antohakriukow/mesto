import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open(name, link) {
    this._popup.querySelector('.fullscreen-popup__title').textContent = name;
    this._popup.querySelector('.fullscreen-popup__img').src = link;
    super.open();
  }
}
