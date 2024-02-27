const scoreSpan = document.querySelector("span#score-js");

const movementsBg = document.querySelector("svg#movements-bg");

const battleBg = document.querySelector("div#battle-bg");

let hideElements;

const winLose = document.querySelector('.win-lose-message')

const playAgainBtn = document.querySelector('#continue')

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
  score = window.localStorage.getItem("score");

  constructor() {
    if (this.score === null) {
      window.localStorage.setItem("score", "0");
      this.score = window.localStorage.getItem("score")
    }

    this.score = parseInt(this.score);
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

    let WinOrLose

    if (userPickedMove === 'scissors') {
      switch (housePickedMove) {
        case possibles.scissors.win:
          WinOrLose = true
          this.boostScore()
        break;

        case possibles.scissors.lose:
          WinOrLose = false
          this.reduceScore()
        break;
      }
    }

    if (userPickedMove === 'rock') {
      switch(housePickedMove) {
        case possibles.rock.win:
          WinOrLose = true
          this.boostScore()
        break;

        case possibles.rock.lose:
          WinOrLose = false
          this.reduceScore()
        break;
      }
    }

    if (userPickedMove === 'paper') {
      switch (housePickedMove) {
        case possibles.paper.win:
          WinOrLose = true
          this.boostScore()
        break;

        case possibles.paper.lose:
          WinOrLose = false
          this.reduceScore()
        break;
      }
    }

    return WinOrLose
  }
}

const game = new Game();

function resetMovements() {
  movements.forEach((move) => {
    move.classList.remove("selected", "hide", "house-picked");
    move.addEventListener("click", manageMovement);
  });
}

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

    let element = hideElements[Math.floor(Math.random() * hideElements.length)]

    element.classList.remove('hide')

    element.classList.add("house-picked");
    setTimeout(() => {
      if (game.compareResult() === true) {
        document.querySelector('.win-lose-message h1').innerText = 'You Win'
      } else {
        document.querySelector('.win-lose-message h1').innerText = 'You Lose'
      }
      winLose.classList.remove('hide')
    }, 500)
  }, 3500);
}

movements.forEach((move) => {
  move.addEventListener("click", manageMovement);
});

playAgainBtn.addEventListener("click", (e) => {
  battleBg.classList.add("hide");
  movementsBg.classList.remove("hide");
  winLose.classList.add("hide");
  resetMovements();
});

const score = window.localStorage.getItem("score");

scoreSpan.innerText = `${score}`;
