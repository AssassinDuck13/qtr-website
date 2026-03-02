const toggle = document.getElementById("theme-toggle");
const settingsBtn = document.getElementById("settings-btn");
const settingsPopup = document.getElementById("settings-popup");
const closeBtn = document.getElementById("close-settings");
const logoBtn = document.getElementById("logo-btn");

// Logo link behaviour: go to main page or scroll if already there
logoBtn.addEventListener("click", (e) => {
  const isMain =
    window.location.pathname.endsWith("qtr_main.html") ||
    window.location.pathname.endsWith("/");
  if (!isMain) {
    return;
  }
  // prevent default navigation and scroll to top instead
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

// Settings popup functionality
settingsBtn.addEventListener("click", () => {
  settingsPopup.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  settingsPopup.classList.add("hidden");
});

// Close popup when clicking outside the content
settingsPopup.addEventListener("click", (e) => {
  if (e.target === settingsPopup) {
    settingsPopup.classList.add("hidden");
  }
});

// Person card popup functionality
const personCards = document.querySelectorAll(".person-card");
const personPopups = document.querySelectorAll(".person-popup");
const personCloseButtons = document.querySelectorAll(".person-close-btn");

personCards.forEach((card) => {
  card.addEventListener("click", () => {
    const personNumber = card.dataset.person;
    const popup = document.getElementById(`person-popup-${personNumber}`);
    popup.classList.remove("hidden");
  });
});

personCloseButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".person-popup").classList.add("hidden");
  });
});

personPopups.forEach((popup) => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });
});

// Initialize EmailJS
emailjs.init("eu1VThVUc3mkKudGj");

// Contact form submission
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const now = new Date();
    const formattedTime = now.toLocaleString();
    const successBar = document.getElementById("successBar");
    const failBar = document.getElementById("failBar");

    document.getElementById("time").value = formattedTime;

    emailjs.sendForm("service_73xy3v5", "template_o8j1j9e", this).then(
      function () {
        successBar.classList.add("show");

        setTimeout(() => {
          successBar.classList.remove("show");
        }, 3000);
      },
      function (error) {
        failBar.classList.add("show");
        setTimeout(() => {
          failBar.classList.remove("show");
        }, 3000);
        console.error("Failed to send message:", error);
      },
    );

    // Reset the form after submission
    event.target.reset();
  });
