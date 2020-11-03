import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  open({place, url}) {
    this._popup.querySelector('.fullscreen-popup__title').textContent = place;
    this._popup.querySelector('.fullscreen-popup__img').src = url;
    super.open();
  }
}