const form = document.querySelector(".form");
const thanksSection = document.querySelector(".thanks");
const formElements = [...form];
const actionElements = ["keydown", "input"];

const removeErrors = (input) => {
  const [...items] = input.parentElement.children;
  items.forEach((element) => {
    if (element.classList.contains("input__error")) {
      element.remove();
    }
    input.classList.remove("error");
  });
};

const renderError = (input, message) => {
  removeErrors(input);
  const parent = input.parentElement;

  const span = document.createElement("div");
  span.classList.add("input__error");
  span.innerHTML = message;

  input.classList.add("error");

  parent.insertAdjacentElement("beforeend", span);
};

const updateCardInfo = (input) => {
  if (input == form["cardholder-name"]) {
    const cardName = document.querySelector(".card__holder-name");
    cardName.innerHTML = form["cardholder-name"].value;
  }

  if (input == form["card-number"]) {
    const cardNumber = document.querySelector(".card__holder-number");
    const cardNumberText = form["card-number"].value;
    cardNumber.innerHTML = cardNumberText.replace(
      /^(\d{4,4})(\d{4,4})(\d{4,4})(\d{4,4})$/g,
      "$1 $2 $3 $4"
    );
  }

  if (
    input == form["card-exp-date-month"] ||
    input == form["card-exp-date-year"]
  ) {
    const cardExpDate = document.querySelector(".card__exp-date");
    const month = form["card-exp-date-month"].value || "00";
    const year = form["card-exp-date-year"].value || "00";
    cardExpDate.innerHTML = `${month}/${year}`;
  }
  if(input == form["card-cvc"]){
    const cardCVC = document.querySelector('.card__cvc');
    cardCVC.innerHTML = input.value;
  }
};

const validateInput = (e) => {
  const input = e.target;
  const invalidKeys = ["e", "E", "-", ".", "+"];

  const min = input.dataset.min;
  const max = input.dataset.max;
  const length = input.value.length;

  if (input.type == "number" && invalidKeys.includes(e.key)) {
    e.preventDefault();
  }
  if (length == 0) {
    renderError(input, `Can't be blank`);
    return;
  }

  if (length < min) {
    renderError(input, `Must have at least ${min} characters`);
    return;
  }

  if (length > max) {
    renderError(input, `May not be greater than ${max} characters`);
    return;
  }
  updateCardInfo(input);
  removeErrors(input);
};



const sendForm = (e) => {
  e.preventDefault();
  formElements
    .filter(({ tagName }) => tagName == "INPUT")
    .forEach((item) => validateInput({ target: item }));

  const error = document.querySelectorAll(".error");
  if(error.length == 0){
    form.classList.add('inactive');
    thanksSection.classList.add('active');
  }
};



actionElements.forEach((action) => {
    formElements
      .filter(({ tagName }) => tagName == "INPUT")
      .forEach((item) => item.addEventListener(action, validateInput));
  });




form["submit"].addEventListener("click", sendForm);
