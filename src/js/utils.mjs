export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data && data !== "undefined") {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Error parsing JSON from localStorage", e);
      return [];
    }
  }
  return [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", template);
    if (callback) {
      callback(data);
    }
  }
}

// --- TEMPLATE LOADING FUNCTIONS ---

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Could not load template at ${path}`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) headerElement.innerHTML = headerTemplate;
    if (footerElement) footerElement.innerHTML = footerTemplate;

  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

// --- UI UTILITIES ---

export function alertMessage(message, scroll = true) {
  // 1. Remove any existing alerts so they don't stack up visually
  const existingAlerts = document.querySelectorAll(".alert");
  existingAlerts.forEach(alert => alert.remove());

  const alert = document.createElement("div");
  alert.classList.add("alert");
  // Use a template literal to keep the HTML clean
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      this.parentElement.removeChild(this);
    }
  });

  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
    if (scroll) window.scrollTo(0, 0);
  }

  // 2. Auto-remove after 4 seconds for a better user experience
  setTimeout(() => {
    if (alert.parentElement) {
      alert.parentElement.removeChild(alert);
    }
  }, 4000);
}