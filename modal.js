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
const content = document.querySelector(".modal-body");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close");
const icon = document.querySelector(".icon");
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

// Event

icon.addEventListener("click", () => {
  editNav()
})

modalBtn.addEventListener("click", () => {
  // faire apparaitre le block formulaire au click du modalBtn
  modalbg.style.display = "block";
  form.classList.remove("hidden");
  validated.style.display = "none";

});

closeBtn.addEventListener("click", () => {
  // On ferme la modal avec la croix
  modalbg.style.display = "none";
  
  hideAllErrors();
});



// function

function showError(input, message) {
  // fonction afin de faire apparaitre les messages d'erreur avec la classe css formData
  const formData = input.closest(".formData"); // on va chercher l'element le plus proche du parent formData , donc les input .
  formData.setAttribute("data-error", message); // setAttribute afin de recuperer l'attribut data-error + ajouté un message d'erreur
  formData.setAttribute("data-error-visible", "true"); // ici on va faire apparaitre l'emplacement du message d'erreur
}

function hideError(input) {
  // On va gérer le cas ou l'utilisateur est revenu sur le champ afin de modifier son erreur
  const formData = input.closest(".formData");
  formData.setAttribute("data-error-visible", "false");
  formData.setAttribute("data-error", "");
}

function hideAllErrors() {
  formDataElements.forEach((formData) => {
    formData.setAttribute("data-error-visible", "false"); // Cache le message d'erreur
    formData.setAttribute("data-error", ""); // Efface le texte du message d'erreur
  });
}

const validate = (event) => {
  event.preventDefault(); // PreventDefault pour stop l'evenement de fermeture par default du formulaire
  let isValid = true; // Création d'un etat si valide ou pas

  const nameRegex = /^[a-zA-ZÀ-ÿ '-]{2,}$/; // regex de nom qui oblige a utiliser minimum deux caractere
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex pour un format d'email valide

  const formData = new FormData(form); // Je crée un nouvelle objet iterable FormData qui aura comme param Key,Value
  // const data = Object.fromEntries(formData.entries());   // Grace a .entries j'obtiens un iterateur et fromEntries pour le changer en objet js lisible
  // console.log(data)

  for (const [key, value] of formData.entries()) {
    // for of pour agir sur plusieur champs sous forme de boucle avec les param key,value
    switch (
      key // switch pour eviter les répétition if if if avec le param key
    ) {
      case "first": // case qui fonctionne avec switch " dans le cas ou la clef s'apelle first ..ect"
        if (!nameRegex.test(value.trim())) {
          // .trim pour que les espace ne soit pas compter comme des characteres , .test methode de verification du regex
          showError(
            firstName,
            "Veuillez entrer un prénom valide (2 caractères minimum)."
          ); // fonction showError + input + message
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
        const birthDateValue = new Date(value); // crée une constante qui prend un format de date 
        if (value === "" || isNaN(birthDateValue.getTime())) {
          showError(birthdate, "Veuillez entrer une date de naissance valide.");
          isValid = false;
        } else {
          hideError(birthdate);
        }
        break;

      case "quantity": // Gere le cas ou c'est bien un number entier positif.
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

  // j'utilise Array.from location( mes boutons radios ) pour les intégrer dans un tableau et avec .some je verifie que au moin 1 data du tableau est checked

  const locationChecked = Array.from(locations).some(
    (button) => button.checked
  );
  // console.log(locationChecked);
  if (!locationChecked) {
    showError(locations[0], "Veuillez sélectionner une localisation."); // On vien visé un element du tableau pour affiché mon message d'erreur
    isValid = false;
  } else {
    hideError(locations[0]);
  }

  if (!conditions.checked) {
    // ici on gere la case conditions qui a comme indication html "checked" , si la case n'est pas checked , error.
    showError(conditions, "Vous devez accepter les conditions d'utilisation.");
    isValid = false;
  } else {
    hideError(conditions);
  }

  if (isValid) {
    // j'ai rajouté une div html afin de faire apparaitre une modal de confirmation .
    form.reset();
    form.classList.add("hidden");
    validated.style.display = "block"; // Affiche le message de confirmation
  
  }
};

// event submit

form.addEventListener("submit", validate);
