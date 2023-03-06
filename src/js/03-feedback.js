import throttle from 'lodash.throttle';

const FORM__KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');



let formData = {};

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM__KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const email = formElements.email.value;
  const message = formElements.message.value;

  if (!email || !message) {
    alert('Все поля ввода должны быть заполнены!');
  }

  console.log(JSON.parse(localStorage.getItem(FORM__KEY)));
  localStorage.removeItem(FORM__KEY);
  e.currentTarget.reset();
}

function loadForm() {
  const savedStorageInputs = localStorage.getItem(FORM__KEY);

  if (savedStorageInputs) {
    const data = JSON.parse(savedStorageInputs);
    inputRef.value = data.email || '';
    textareaRef.value = data.message || '';
  }
}
loadForm();