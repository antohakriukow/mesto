class FormValidator {
  constructor (config, formElement) {
    this._formElement = formElement
    this._formInputErrorActiveClass = config.popupInputFieldErrorActive
    this._popupInputFieldError = config.popupInputFieldError
    this._popupSubmitBtnDisabled = config.popupSubmitBtnDisabled
    this._formInputSelector = config.formInputSelector
    this._formSubmitSelector = config.formSubmitSelector
    this._inputFields = Array.from(formElement.querySelectorAll(config.formInputSelector));
    this._submitBtn = formElement.querySelector(config.formSubmitSelector);
  }

    // Показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    const errorInput = errorElement.previousElementSibling

    errorElement.textContent = errorMessage
    errorElement.classList.add(this._formInputErrorActiveClass)
    errorInput.classList.add(this._popupInputFieldError)
  }

  // Скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    const errorInput = errorElement.previousElementSibling

    errorElement.textContent = ''
    errorElement.classList.remove(this._formInputErrorActiveClass)
    errorInput.classList.remove(this._popupInputFieldError)
  }

  // Функция валидации
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  // Проверка на наличие невалидного поля 
  _hasInvalidInput() {
    return this._inputFields.some((inputElement) => !inputElement.validity.valid)
  }

  // Изменение состояния кнопки
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._popupSubmitBtnDisabled)
      this._submitBtn.setAttribute('disabled', true)
    } else {
      this._submitBtn.classList.remove(this._popupSubmitBtnDisabled)
      this._submitBtn.removeAttribute('disabled')
    }
  }

  // Listeners
  _setValidationEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formInputSelector))
    const buttonElement = this._formElement.querySelector(this._formSubmitSelector)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this.toggleButtonState(inputList, buttonElement)
      })
    })

    this.toggleButtonState(inputList, buttonElement)
  }

  enableValidation() {
    const handleFormSubmit = (evt) => {
      evt.preventDefault()
    }
    this._formElement.addEventListener("submit", handleFormSubmit)

    this._setValidationEventListeners()
  }

}


export default FormValidator