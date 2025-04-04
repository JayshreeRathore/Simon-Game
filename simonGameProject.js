

const btnColors = ["red", "green", "blue", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let highScore = 0;
let gameStarted = false;




const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  wrong: new Audio("https://www.orangefreesounds.com/wp-content/uploads/2017/03/Wrong-buzzer.mp3"),
  start: new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_4c8cbdf6e2.mp3")
};

const levelTitle = document.getElementById("level-title");
const highScoreText = document.getElementById("high-score");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const endBtn = document.getElementById("end-btn");

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play().catch(err => console.warn("Sound error:", err));
  }
}

function flashBtn(color) {
  const btn = document.getElementById(color);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function nextSequence() {
  userSequence = [];
  level++;
  levelTitle.textContent = `Level ${level}`;

  const randomColor = btnColors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  setTimeout(() => {
    flashBtn(randomColor);
    playSound(randomColor);
  }, 500);
}

function startGame() {
  playSound("start");
  gameStarted = true;
  level = 0;
  gameSequence = [];
  userSequence = [];
  startBtn.disabled = true;
  restartBtn.disabled = false;
  endBtn.disabled = false;
  nextSequence();
}

function restartGame() {
  startGame();
}

function endGame() {
  gameStarted = false;
  startBtn.disabled = false;
  restartBtn.disabled = true;
  endBtn.disabled = true;
  levelTitle.textContent = "Press Start to Begin";
  gameSequence = [];
  userSequence = [];
}

function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
      playSound("wrong");
      document.body.style.backgroundColor = "red";
  
      // 3 sec baad background wapas normal ho jaye
      setTimeout(() => {
        document.body.style.backgroundColor = "#111"; // dark background
        levelTitle.innerHTML = `Game Over at Level ${level}`;
  
        if (level > highScore) {
          highScore = level;
          highScoreText.textContent = `High Score: ${highScore}`;
        }
  
        endGame();
      }, 1000);
  
      return;
    }
  
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  }
  


document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!gameStarted) return;

    const color = btn.id;
    userSequence.push(color);
    playSound(color);
    flashBtn(color);
    checkAnswer(userSequence.length - 1);
  });
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
endBtn.addEventListener("click", endGame);
