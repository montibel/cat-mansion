
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
daddy.src = "./images/daddy.png";
const rat = new Image();
rat.src = "./images/rat.png";
const music = new Audio ("./music/horror-ambient.mp3");
const it = new Image();
it.src = "./images/it.png"


//SCORE VARIABLES

let timer;

//GAME
let isGameOver = false;
let gameId = 0;

// CAT
let catX = 50;
let catY = 400;
const catHeight = 250;
const catWidth = 150;

// GHOST
const ghostX = 700;
const ghostY = 300;
const ghostHeight = 100;
const ghostWidth = 200;

// DADDY
const daddyX = 700;
const daddyY = 400;
const daddyHeight = 300;
const daddyWidth = 200;

// RAT
const ratX = 500;
const ratY = 200;
const ratHeight = 300;
const ratWidth = 200;

// IT

const itX = 900
const itY = 200 
const itHeight = 300
const itWidth = 200

// ARROW KEYS 
let isMovingRight = false; // ARROW KEYS
let isMovingLeft = false;  // ARROW KEYS
let isMovingUp = false;   // ARROW KEYS
let isMovingDown = false; // ARROW KEYS

// MONSTERS
let monsters = [
{ img: ghost, x: ghostX, y: ghostY, height: ghostHeight, width: ghostWidth},
{ img: ghost, x: ghostX + 500, y: ghostY + 100, height: ghostHeight, width: ghostWidth },
{ img: ghost, x: ghostX + 1000, y: ghostY+200, height: ghostHeight, width: ghostWidth },
{ img: ghost, x: ghostX + 1500, y: ghostY-100, height: ghostHeight, width: ghostWidth },
{ img: daddy, x: daddyX + 2000, y: daddyY-200, height: daddyHeight, width: daddyWidth },
{ img: daddy, x: daddyX + 2700, y: daddyY+200 , height: daddyHeight, width: daddyWidth },
{ img: daddy, x: daddyX + 2500, y: daddyY-100, height: daddyHeight, width: daddyWidth },
{ img: daddy, x: daddyX + 3000, y: daddyY-200, height: daddyHeight, width: daddyWidth },
{ img: rat, x: ratX + 3500, y: ratY +100, height: ratHeight-200, width: ratWidth },
{ img: rat, x: ratX + 4500, y: ratY -200, height: ratHeight-100, width: ratWidth},
{ img: rat, x: ratX + 6000, y: ratY -100, height: ratHeight-50, width: ratWidth},
{ img: rat, x: ratX + 600, y: ratY+200, height: ratHeight, width: ratWidth},
{ img: it, x: itX + 6500, y: itY, height: itHeight, width: itWidth },
{ img: it, x: itX + 7000, y: itY, height: itHeight, width: itWidth },
{ img: it, x: itX + 7500, y: itY, height: itHeight, width: itWidth },
{ img: it, x: itX + 8000, y: itY, height: itHeight, width: itWidth},
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
    score.style.display = "flex";
    startScreen.style.display = "none";
    gameBoard.style.display = "flex";
    music.play();

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

      if (currentMonster.y + currentMonster.height > catY &&
        catX + catWidth > currentMonster.x &&
        catX < currentMonster.x + currentMonster.width &&
        catY + catHeight > currentMonster.y
      ) {
        isGameOver = true;
      }
    }


    // MOVE THE CAT

    if (isMovingRight === true && catX + catHeight - 350 < canvas.height) {
      catX += 6
    } else if (isMovingLeft === true && catX + catHeight + 850 > canvas.width) {
      catX -= 6
    }
    else if (isMovingUp === true && catY + catHeight + 850 > canvas.width) {
      catY -= 6
    }
    else if (isMovingDown === true && catY + catHeight < canvas.height) {
      catY += 6
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


