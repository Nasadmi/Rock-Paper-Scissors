const scoreSpan = document.querySelector("span#score-js");

const score = window.localStorage.getItem("score");

const movementsBg = document.querySelector("svg#movements-bg");

const battleBg = document.querySelector("div#battle-bg");

let hideElements;

const movements = document.querySelectorAll(
  "main.content section.game div.movement"
);

const possibles = {
  scissors: {
    win: 'paper',
    lose: 'rock'
  },
  rock: {
    win: 'scissors',
    lose: 'paper'
  },
  paper: {
    win: 'rock',
    lose: 'scissors'
  }
}

class Game {
  score = score;

  constructor() {
    if (this.score === null) {
      window.localStorage.setItem("score", "0");
    }

    this.score = parseInt(score);
  }

  boostScore() {
    this.score++;
    this.setScore();
  }

  reduceScore() {
    if (this.score === 0) {
      return;
    }
    this.score--;
    this.setScore();
  }

  setScore() {
    window.localStorage.setItem("score", `${this.score}`);
    scoreSpan.innerText = `${this.score}`;
  }

  compareResult() {
    const housePickedMove = document.querySelector("main.content section.game div.movement.house-picked").getAttribute("data-movement")
    const userPickedMove = document.querySelector("main.content section.game div.movement.selected").getAttribute("data-movement")

    if (userPickedMove === 'scissors') {
      
    }
  }
}

const game = new Game();

function manageMovement(e) {
  e.stopPropagation();
  movements.forEach((otherMove) => {
    if (otherMove !== e.currentTarget) {
      otherMove.classList.add("hide");
    }
  });
  e.currentTarget.classList.toggle("selected");
  e.currentTarget.classList.remove("hide");
  movementsBg.classList.add("hide");
  battleBg.classList.remove("hide");

  movements.forEach((move) => {
    move.removeEventListener("click", manageMovement);
  });

  setTimeout(() => {
    hideElements = document.querySelectorAll(
      "main.content section.game div.movement.hide"
    );
    hideElements[
      Math.floor(Math.random() * hideElements.length)
    ].classList.remove("hide");
    hideElements[Math.floor(Math.random() * hideElements.length)].classList.add(
      "house-picked"
    );
  }, 2500);
}

movements.forEach((move) => {
  move.addEventListener("click", manageMovement);
});

scoreSpan.innerText = `${score}`;
