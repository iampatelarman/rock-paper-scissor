// ============== SHOW / HIDE GAME RULES =================

const rulesBtn = document.querySelector(".rules-btn");
const gameRules = document.querySelector(".game-rules");
rulesBtn.addEventListener("click", () => {
  gameRules.classList.add("show-rules");
});

const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", () => {
  gameRules.classList.remove("show-rules");
});

// ============ END OF SHOW / HIDE GAME RULES =============

// ============== GAME LOGIC ===============

let arr = ["rock", "paper", "scissor"];
let userHand = "";
let pcHand = "";
let result = "";

const compScoreDom = document.querySelector(".comp-score");
const userScoreDom = document.querySelector(".user-score");

let score = JSON.parse(localStorage.getItem("score")) || {
  userScore: 0,
  compScore: 0,
};
userScoreDom.innerText = score.userScore;
compScoreDom.innerText = score.compScore;

// showing next button conditioned on result
showNext();

function showNext() {
  const nextBtn = document.querySelector(".next-btn");
  if (score.userScore > score.compScore) {
    nextBtn.classList.add("show-next");
  } else {
    nextBtn.classList.remove("show-next");
  }
}

//outlines for different moves
let colors = {
  rock: "15px solid #0074b6",
  paper: "15px solid #ffa943",
  scissor: "15px solid #bd00ff",
};

// event listener on game buttons
const gameBTNs = document.querySelectorAll(".round-btn");
gameBTNs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    userHand = e.target.parentElement.id;
    if (userHand) {
      decideWinner();
    }
    console.log(score);
  });
});

function decideWinner() {
  let randomNum = Math.floor(Math.random() * 3);
  pcHand = arr[randomNum];

  // logic for result
  if (userHand === pcHand) result = "draw";
  else if (userHand === "paper") {
    if (pcHand === "rock") result = "user";
    if (pcHand === "scissor") result = "comp";
  } else if (userHand === "rock") {
    if (pcHand === "scissor") result = "user";
    if (pcHand === "paper") result = "comp";
  } else if (userHand === "scissor") {
    if (pcHand === "rock") result = "comp";
    if (pcHand === "paper") result = "user";
  }

  const msg = document.querySelector(".msg");

  if (result === "draw") {
    msg.innerText = "Tie Up";
  } else if (result === "user") {
    console.log("user");
    msg.innerText = "YOU WON";
    score.userScore += 1;
    userScoreDom.innerText = score.userScore;
  } else if (result === "comp") {
    console.log("comp");
    msg.innerText = "You lost";
    score.compScore += 1;
    compScoreDom.innerText = score.compScore;
  }

  showNext();

  const playArea = document.querySelector(".play-area");
  const winnerArea = document.querySelector(".winner-area");
  const playAgainBtn = document.querySelector(".play-again-btn");

  // logic for changing text in play again button
  if (result === "draw") {
    playAgainBtn.innerText = "replay";
  } else {
    playAgainBtn.innerText = "play again";
  }

  playArea.classList.add("hide-play-area");
  winnerArea.classList.add("show-winner");

  // to show user selected move
  const userImg = document.getElementById("user-img");
  userImg.src = `./images/${userHand}.png`;
  userImg.parentElement.style.outline = colors[userHand];

  // to show comp selected move
  const compImg = document.getElementById("comp-img");
  compImg.src = `./images/${pcHand}.png`;
  compImg.parentElement.style.outline = colors[pcHand];

  // winner animation (green cirlces) logic
  if (result === "user") {
    userImg.parentElement.classList.add("winner-shadow");
  } else if (result === "comp") {
    compImg.parentElement.classList.add("winner-shadow");
  }

  // setting score in localstorage
  localStorage.setItem("score", JSON.stringify(score));

  // showing game buttons again
  playAgainBtn.addEventListener("click", () => {
    playArea.classList.remove("hide-play-area");
    winnerArea.classList.remove("show-winner");
    if (result === "user") {
      userImg.parentElement.classList.remove("winner-shadow");
    } else if (result === "comp") {
      compImg.parentElement.classList.remove("winner-shadow");
    }
  });
}
// clear scores when going to hurray page using next button
function clearStorage() {
  localStorage.clear();
}
