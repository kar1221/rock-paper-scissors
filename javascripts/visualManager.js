// Private Functions

function removeClassHidden(target) {
  target.classList.remove("hidden");
}

// Public Functions

export function elementInitialize() {
  const titleContainer = document.querySelector(".text-container");

  setTimeout(removeClassHidden, 300, titleContainer);
  setTimeout(changeTitleAnimated, 350, "Rock Paper Scissors");

  const gameplayContainer = document.querySelector(".gameplay-container");
  const optionContainer = document.querySelector(".option-container");
  setTimeout(removeClassHidden, 1200, gameplayContainer);
  setTimeout(removeClassHidden, 1200, optionContainer);

  setTimeout(changeTitleAnimated, 1800, "Choose your weapon");
}

export function AddScoreTo(target) {
  let targetScore;

  if (target === "player")
    targetScore = document.querySelector("#player-score");
  else if (target === "computer")
    targetScore = document.querySelector("#computer-score");

  // ISTG Javascript is so weird
  let currentScore = +targetScore.textContent;

  currentScore++;

  targetScore.textContent = `${currentScore}`;
}

/**
 *
 * @param target {"computer"|"player"}
 * @param spriteName {"rock"|"paper"|"scissors"}
 */
export function changeSprite(target, spriteName) {
  // Perform a check before entering the main event, ensured that 'targetFile' is defined.
  const validOptions = ["rock", "paper", "scissors"];
  if (!validOptions.includes(spriteName)) {
    console.log(`${spriteName} does not exist!`);
    return;
  }

  let targetSelection;
  let targetSelectionChild;
  let className;

  if (target === "computer") {
    targetSelection = document.querySelector("#computer-selection");
    targetSelectionChild = document.querySelector("#computer-selection img");
    className = "computer";
  } else if (target === "player") {
    targetSelection = document.querySelector("#player-selection");
    targetSelectionChild = document.querySelector("#player-selection img");
    className = "player";
  } else {
    console.log(`Invalid input: ${target}`);
    return;
  }

  const targetFile = `./assets/${spriteName}.svg`;

  // Animation

  /*
  The Whole process goes like this:
  1. Set the opacity of the img object to 0, which fires the 'transition' property I set in my stylesheet.
  2. Remove the img object from the container.
  3. Create another img object based on the parameter 'spriteName'.
  4. Set the opacity of the new img object to 0.
  5. Remove the opacity set in the new img object.
   */
  // Set the opacity to 0 first, so it has time to perform transition.
  targetSelectionChild.style.opacity = "0";

  setTimeout(() => {
    targetSelection.replaceChildren();

    // Element Creation
    const newImage = document.createElement("img");
    newImage.src = targetFile;
    newImage.style.opacity = "0";
    newImage.classList.add(className);

    targetSelection.appendChild(newImage);
    // Remove it from inline style so that it uses the ruleset from my css stylesheet.
    setTimeout(() => {
      newImage.style.opacity = "";
    }, 50);
  }, 200);
}

export function changeTitleAnimated(message) {
  const target = document.querySelector("#title");

  if (target.textContent.length > 0) target.textContent = "";

  const speed = 40;
  let index = 0;

  function type() {
    if (index < message.length) {
      target.textContent += message.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

export function gameOver() {
  const gameOverScreen = document.querySelector(".game-over-screen");
  gameOverScreen.classList.remove("hidden");
}
