
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");
const gameBoard = document.querySelector("#game-board");
const gameOver = document.querySelector("#gameover");
const win = document.querySelector("#win");
let score = document.querySelector("#timer");

//IMAGES
const background = new Image();
background.src = "./images/black-background.png";
const cat = new Image();
cat.src = "./images/cat.png"
const ghost = new Image();
ghost.src = "./images/ghost.png";
const daddy = new Image();
daddy.src = "./images/daddy.png"

//SCORE VARIABLES

let timer;

//GAME
let isGameOver = false;
let gameId = 0;

// CAT
let catX = 50;
let catY = 600;
const catHeight = -150;
const catWidth = 100;

// GHOST
const ghostX = 700;
const ghostY = 300;
const ghostHeight = 100;
const ghostWidth = 200;

// DADDY
const daddyX = 700;
const daddyY = 400;
const daddyHeight = 200;
const daddyWidth = 100;

// ARROW KEYS 
let isMovingRight = false; // ARROW KEYS
let isMovingLeft = false;  // ARROW KEYS
let isMovingUp = false;   // ARROW KEYS
let isMovingDown = false; // ARROW KEYS

// MONSTERS
let monsters = [
{ img: ghost, x: ghostX, y: ghostY, height: ghostHeight, width: ghostWidth},
{ img: ghost, x: ghostX + 900, y: ghostY, height: ghostHeight, width: ghostWidth },
{ img: ghost, x: ghostX + 600, y: ghostY, height: ghostHeight, width: ghostWidth },
{ img: ghost, x: ghostX + 500, y: ghostY, height: ghostHeight, width: ghostWidth },
{ img: daddy, x: daddyX + 1500, y: daddyY, height: daddyHeight, width: daddyHeight },
{ img: daddy, x: daddyX + 2000, y: daddyY, height: daddyHeight, width: daddyHeight },
{ img: daddy, x: daddyX + 2500, y: daddyY, height: daddyHeight, width: daddyHeight },
{ img: daddy, x: daddyX + 3000, y: daddyY, height: daddyHeight, width: daddyHeight }
];


// FUNCTION SCORE

function timeIsRunning() {
  let sec = 60;
  let timer = setInterval(function () {
    document.getElementById("timer").innerHTML = sec;
    sec --;
    if(sec == 0){
      clearInterval(timer)
      cancelAnimationFrame(gameId)
      win.style.display = "flex";
      score.style.display = "none";
      gameOver.style.display = "none"
      console.log("you win");
      canvas.style.display = "none";
    }
    if(isGameOver){clearInterval(timer)};
  }, 1000);
}

//START BUTTON AND HIDE CANVAS 

window.onload = () => {
  canvas.style.display = "none"; // THIS HIDE THE CANVAS
  gameBoard.style.display = "none";
  gameOver.style.display = "none";
  win.style.display = "none";
  score.style.display = "none";
  document.getElementById("start-button").onclick = () => { 
    console.log("starting");
    canvas.style.display = "block"; // THIS IS THE BACKGROUND
    startGame();
    timeIsRunning();
  }
  document.getElementById("end-button").onclick = () => {
    location.reload()
  }


  function startGame() {
    console.log(gameId);
    score.style.display = "flex";
    startScreen.style.display = "none";
    gameBoard.style.display = "flex";

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); // THIS IS THE SIZE FROM BACKGROUND
    ctx.drawImage(cat, catX, catY, catWidth, catHeight);   // THIS IS THE SIZE FROM THE CAT 


    // GAME OVER 

    if (isGameOver) {
      cancelAnimationFrame(gameId);
      gameOver.style.display = "flex"
      console.log("game over");
      canvas.style.display = "none";
      score.style.display = "none";
    }
    else {
      gameId = requestAnimationFrame(startGame);
    }

    // COLLISION

    for (let i = 0; i < monsters.length; i++) {
      let currentMonster = monsters[i]
      ctx.drawImage(currentMonster.img, currentMonster.x, currentMonster.y, currentMonster.width, currentMonster.height);
      currentMonster.x -= 3

      if (currentMonster.y + currentMonster.width > catY &&
        catX + catWidth > currentMonster.x &&
        catX < currentMonster.x + currentMonster.width &&
        catY + currentMonster.height > currentMonster.y
      ) {
        isGameOver = true;
      }
    }


    // MOVE THE CAT

    if (isMovingRight === true) {
      catX += 4
    } else if (isMovingLeft === true) {
      catX -= 4
    }
    else if (isMovingUp === true) {
      catY -= 4
    }
    else if (isMovingDown === true) {
      catY += 4
    }


    //MOVEMENT OF THE CAT
    document.addEventListener('keydown', event => {
      if (event.code === "ArrowRight") {
        console.log("We are going right!")
        isMovingRight = true
      } else if (event.code === "ArrowLeft") {
        console.log("We are going left!")
        isMovingLeft = true
      }
      else if (event.code === "ArrowUp") {
        console.log("We are going up")
        isMovingUp = true
      }
      else if (event.code === "ArrowDown") {
        console.log("We are going down")
        isMovingDown = true
      }
    })

    //STOP THE CAT FROM MOVING 
    document.addEventListener('keyup', () => {
      isMovingRight = false
      isMovingLeft = false
      isMovingUp = false
      isMovingDown = false
    })
  }
}


