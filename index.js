import { elementInitialize } from "./javascripts/visualManager.js";
import { enableButtons } from "./javascripts/gameManager.js";

// ----------------------------- Start Button -----------------------------------

const startButton = document.querySelector("#start-btn");

window.addEventListener("load", () => {
  startButton.classList.remove("hidden");
});

startButton.addEventListener("click", (e) => {
  elementInitialize();

  // Add transition before deleting start button.
  e.target.classList.add("hidden");
  setTimeout(() => {
    e.target.parentNode.removeChild(e.target);
  }, 100);

  setTimeout(enableButtons, 2500);
});

// ------------------------------------------------------------------------------
