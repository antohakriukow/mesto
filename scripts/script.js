let userSection = document.querySelector('.user');
let userName = userSection.querySelector('.user__name');
let userAbout = userSection.querySelector('.user__about');
let userEditBtn = userSection.querySelector('.user__edit-btn');

let popupSection = document.querySelector('.popup');
let popupNameInput = popupSection.querySelector('.popup__input-field_name');
let popupAboutInput = popupSection.querySelector('.popup__input-field_about');
let popupForm = popupSection.querySelector('.popup__input-container');
let popupCloseBtn = popupSection.querySelector ('.popup__close-btn');

console.log(userName.textContent);
console.log(userAbout.textContent);

function popupSwitch() {
  if (popupSection.classList.contains('popup_opened') === false) {
    popupNameInput.value = userName.textContent;
    popupAboutInput.value = userAbout.textContent;
    popupSection.classList.toggle('popup_opened');
  } else {
    popupSection.classList.toggle('popup_opened');
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = popupNameInput.value;
  userAbout.textContent = popupAboutInput.value;

  popupSwitch();
}

userEditBtn.addEventListener('click', popupSwitch);
popupCloseBtn.addEventListener('click', popupSwitch);
popupForm.addEventListener('submit', formSubmitHandler);