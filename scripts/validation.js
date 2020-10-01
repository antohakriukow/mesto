// Показать сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const errurInput = errorElement.previousElementSibling;

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-field-error_active");
  errurInput.classList.add('popup__input-field_error');
};

// Скрыть сообщение об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  const errurInput = errorElement.previousElementSibling;

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-field-error_active");
  errurInput.classList.remove('input-field_error');
};

// Функция валидации
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Проверка на наличие невалидного поля 
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Изменение состояния кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-btn_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__submit-btn_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

// Listeners
function setValidationEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input-field"));
  const buttonElement = formElement.querySelector(".popup__submit-btn");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
};

(function enableValidation() {
  const formElements = document.querySelectorAll(".popup");
  const formList = Array.from(formElements);
  const formListIterator = (formElement) => {
    const submitFormHandler = (event) => {
      event.preventDefault();
    };
    formElement.addEventListener("submit", submitFormHandler);

    setValidationEventListeners(formElement);
  };

  formList.forEach(formListIterator);
})()