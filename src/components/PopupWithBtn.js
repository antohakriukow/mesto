import Popup from './Popup.js'

export default class PopupWithBtn extends Popup {
  constructor(popup) {
    super(popup)
    this._deleteSubmitter = this._popup.querySelector('.js-delete_submitter')
    this.submitFunction = null
  }

  setSubmitFunction(submitFunction) {
    this.submitFunction = submitFunction
}

  setEventListeners() {
    // debugger
    super.setEventListeners()
    this._deleteSubmitter.addEventListener('click', (evt) => {
      evt.preventDefault()
      this.submitFunction()
    })
  }
}