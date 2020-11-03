import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popup, submitFunction) {
    super(popup)
    this._submitFunction = submitFunction
    this._inputContainer = this._popup.querySelector('.popup__input-container')
    this._inputFields = this._inputContainer.querySelectorAll('.popup__input-field')
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputFields.forEach((input) => {this._inputValues[input.name] = input.value})
    return this._inputValues
  }

  close() {
    super.close()
    this._inputContainer.reset()
  }
  
  setEventListeners() {
    super.setEventListeners()
    this._inputContainer.addEventListener('submit', (evt) => {this._submitFunction(evt, this._getInputValues())})
  }
}