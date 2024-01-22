import {
  AddScoreTo,
  changeSprite,
  changeTitleAnimated,
  gameOver,
} from "./visualManager.js";

// Private Function
function getComputerChoice() {
  const computerChoice = getRandomInt(0, 3);

  switch (computerChoice) {
    case 0:
      return "scissors";
    case 1:
      return "rock";
    case 2:
      return "paper";
  }
}

function handleUserClick(event) {
  const paperButton = document.querySelector("#paper");
  const scissorsButton = document.querySelector("#scissors");
  const rockButton = document.querySelector("#rock");

  const eventTarget = event.target;

  if (eventTarget === paperButton || eventTarget.parentNode === paperButton) {
    playerMakeMove("paper");
  } else if (
    eventTarget === scissorsButton ||
    eventTarget.parentNode === scissorsButton
  ) {
    playerMakeMove("scissors");
  } else if (
    eventTarget === rockButton ||
    eventTarget.parentNode === rockButton
  ) {
    playerMakeMove("rock");
  }

  // If you click fast enough, two changeTitleAnimated() will overlap together, which will cause some chaos.
  // Disable button temporary to prevent this.
  disableButtons();
  setTimeout(enableButtons, 500);

  if (checkGameOver()) {
    setTimeout(changeTitleAnimated, 700, "Game Over");
    setTimeout(gameOver, 1300);
  }
}

function checkGameOver() {
  // I hate this
  const playerScore = +document.querySelector("#player-score").textContent;
  const computerScore = +document.querySelector("#computer-score").textContent;

  return playerScore > 5 || computerScore > 5;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper") ||
    (player === "rock" && computer === "scissors")
  )
    return "player";

  return "computer";
}
// Public Function
export function playerMakeMove(playerChoice) {
  const computerChoice = getComputerChoice();

  changeSprite("player", playerChoice);
  changeSprite("computer", computerChoice);

  const winner = getWinner(playerChoice, computerChoice);

  if (winner === "draw") {
    changeTitleAnimated("It's a draw");
  } else {
    changeTitleAnimated(`${winner} Won!`);
    AddScoreTo(winner);
  }
}

export function enableButtons() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleUserClick);
  });
}

export function disableButtons() {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.removeEventListener("click", handleUserClick);
  });
}
