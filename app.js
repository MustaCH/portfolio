let flagElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }

  // Actualizar los placeholders de los inputs y textarea
  const inputs = document.querySelectorAll("input[data-placeholder]");
  const textarea = document.querySelector("textarea[data-placeholder]");

  inputs.forEach((input) => {
    const inputPlaceholder = input.getAttribute("data-placeholder");
    if (texts.contact[inputPlaceholder]) {
      input.setAttribute("placeholder", texts.contact[inputPlaceholder]);
    }
  });

  if (textarea) {
    const textareaPlaceholder = textarea.getAttribute("data-placeholder");
    if (texts.contact[textareaPlaceholder]) {
      textarea.setAttribute("placeholder", texts.contact[textareaPlaceholder]);
    }
  }
};

const setSelected = (selectedLanguage) => {
  const flagContainers = document.querySelectorAll(".flag-container");

  flagContainers.forEach((container) => {
    const language = container.dataset.language;
    const flag = container.querySelector(".flag");

    if (language === selectedLanguage) {
      flag.style.opacity = "1";
    } else {
      flag.style.opacity = "0.5";
    }
  });
};

const defaultLanguage = "es";
changeLanguage(defaultLanguage);

document.addEventListener("DOMContentLoaded", () => {
  setSelected(defaultLanguage);
});

flagElement.addEventListener("click", (e) => {
  const selectedLanguage = e.target.parentElement.dataset.language;
  changeLanguage(selectedLanguage);
  setSelected(selectedLanguage);
});
