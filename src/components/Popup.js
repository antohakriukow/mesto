const body = document.querySelector('.body')

export default class Popup {
  constructor(popup) {
    this._popup = popup
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    body.classList.add('body_noscroll')
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened')
    body.classList.remove('body_noscroll')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-btn').addEventListener('click', () => this.close())
    this._popup.addEventListener('click', (evt) => {this._closePopupByClickOnOverlay(evt)})
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _closePopupByClickOnOverlay(evt) {
    if (evt.target !== evt.currentTarget) {
      return
    }
    this.close()
  }

  showButton() {console.log(this._popup.querySelector('.popup__submit-btn').textContent)}
}