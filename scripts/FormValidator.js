class FormValidator {
  constructor (formSelector, config) {
    // this._formElement = formElement
    this._formSelector = formSelector;
    this._formElement = document.querySelector(formSelector)
    this._formInputErrorActiveClass = config.popupInputFieldErrorActive
    this._popupInputFieldError = config.popupInputFieldError
    this._popupSubmitBtnDisabled = config.popupSubmitBtnDisabled
    this._formInputSelector = config.formInputSelector;
    this._formSubmitSelector = config.formSubmitSelector;
  }

    // Показать сообщение об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    const errorInput = errorElement.previousElementSibling
    console.log(errorElement)
    console.log(errorInput)

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formInputErrorActiveClass)
    errorInput.classList.add(this._popupInputFieldError)
  };

  // Скрыть сообщение об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    const errorInput = errorElement.previousElementSibling

    errorElement.textContent = ''
    errorElement.classList.remove(this._formInputErrorActiveClass)
    errorInput.classList.remove(this._popupInputFieldError)
  };

  // Функция валидации
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  };

  // Проверка на наличие невалидного поля 
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
  };

  // Изменение состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._popupSubmitBtnDisabled)
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this._popupSubmitBtnDisabled)
      buttonElement.removeAttribute('disabled')
    }
  }

  // Listeners
  _setValidationEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._formInputSelector))
    const buttonElement = this._formElement.querySelector(this._formSubmitSelector)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList, buttonElement)
      })
    })

    this._toggleButtonState(inputList, buttonElement)
  }

  enableValidation() {
    const submitFormHandler = (evt) => {
      evt.preventDefault();
    };
    this._formElement.addEventListener("submit", submitFormHandler);

    this._setValidationEventListeners();
    console.log(this._formElement)
  }
}

export default FormValidator