function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const content = document.querySelector(".content");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close");
const closeValidated = document.querySelector(".closeValidated");
const valueFormText = document.querySelectorAll(".text-control");
const validated = document.querySelector(".validated");
const form = document.querySelector("form");
const formDataElements = form.querySelectorAll(".formData");
const firstName = form.querySelector('input[name="first"]');
const lastName = form.querySelector('input[name="last"]');
const email = form.querySelector('input[name="email"]');
const birthdate = form.querySelector('input[name="birthdate"]');
const quantity = form.querySelector('input[name="quantity"]');
const conditions = form.querySelector('input[name="conditions"]');
const locations = form.querySelectorAll('input[name="location"]');

// Btn

modalBtn.addEventListener("click", () => {
  modalbg.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  form.reset();
  hideAllErrors();
});

closeValidated.addEventListener("click", () => {
  validated.style.display = "none";
  modalbg.style.display = "none";
  content.classList.remove("hidden");
});

// function

function showError(input, message) {
  const formData = input.closest(".formData");
  formData.setAttribute("data-error", message);
  formData.setAttribute("data-error-visible", "true");
}

function hideError(input) {
  const formData = input.closest(".formData");
  formData.setAttribute("data-error-visible", "false");
  formData.setAttribute("data-error", "");
}

function hideAllErrors() {
  formDataElements.forEach((formData) => {
    formData.setAttribute("data-error-visible", "false");
    formData.setAttribute("data-error", "");
  });
}

const validate = (event) => {
  event.preventDefault();
  let isValid = true;

  const nameRegex = /^[a-zA-ZÀ-ÿ '-]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const formData = new FormData(form);
  // const data = Object.fromEntries(formData.entries());
  // console.log(data);

  for (const [key, value] of formData.entries()) {
    switch (key) {
      case "first":
        if (!nameRegex.test(value.trim())) {
          showError(
            firstName,
            "Veuillez entrer un prénom valide (2 caractères minimum)."
          );
          isValid = false;
        } else {
          hideError(firstName);
        }
        break;

      case "last":
        if (!nameRegex.test(value.trim())) {
          showError(
            lastName,
            "Veuillez entrer un nom valide (2 caractères minimum)."
          );
          isValid = false;
        } else {
          hideError(lastName);
        }
        break;

      case "email":
        if (!emailRegex.test(value.trim())) {
          showError(email, "Veuillez entrer une adresse e-mail valide.");
          isValid = false;
        } else {
          hideError(email);
        }
        break;

      case "birthdate":
        const birthDateValue = new Date(value);
        if (value === "" || isNaN(birthDateValue.getTime())) {
          showError(birthdate, "Veuillez entrer une date de naissance valide.");
          isValid = false;
        } else {
          hideError(birthdate);
        }
        break;

      case "quantity":
        if (value.trim() === "" || isNaN(value) || parseInt(value) < 0) {
          showError(
            quantity,
            "Veuillez renseigner un nombre valide pour le nombre de tournois."
          );
          isValid = false;
        } else {
          hideError(quantity);
        }
        break;

      default:
        break;
    }
  }

  const locationChecked = Array.from(locations).some(
    (button) => button.checked
  );
  if (!locationChecked) {
    showError(locations[0], "Veuillez sélectionner une localisation.");
    isValid = false;
  } else {
    hideError(locations[0]);
  }

  if (!conditions.checked) {
    showError(conditions, "Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  } else {
    hideError(conditions);
  }

  if (isValid) {
    form.reset();
    content.classList.add("hidden");
    validated.style.display = "block";
  }
};
