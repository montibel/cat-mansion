
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro"); 

//IMAGES
const background = new Image();
background.src = "../images/black-background.jpeg"; 
const cat = new Image(); 
cat.src = "../images/cat.png"
const ghost = new Image(); 
ghost.src = "../images/ghost.png"; 

//MOVING STUFF
let isGameOver = false;
let gameId = 0;
let catX = 200;
let catY = 500;
let ghostX = 200;
let ghostY = 599;
const catHeight = -200;
const catWidth = 400;
let isMovingRight = false; // ARROW KEYS
let isMovingLeft = false;  // ARROW KEYS
let isMovingUp = false;   // ARROW KEYS
let isMovingDown = false; // ARROW KEYS


//START BUTTON AND HIDE CANVAS 
window.onload = () => {
  canvas.style.display = "none" // THIS HIDE THE CANVAS
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
  canvas.style.display = "block" // THIS IS THE BLACK BACKGROUND
    startGame();
  };

  function startGame() {
    console.log(gameId);
    startScreen.style.display = "none"; 
    ctx.drawImage(background, 0, 0, canvas.width , canvas.height); // THIS IS THE SIZE FROM BACKGROUND
    ctx.drawImage(cat, catX, catY, catWidth, catHeight);   // THIS IS THE SIZE FROM THE CAT
    ctx.drawImage(ghost, ghostX, ghostY, 200, 100); 

if(isGameOver) { 
    cancelAnimationFrame(gameId);
} else {
  gameId = requestAnimationFrame(startGame); 
}

if (gameId === 2000) {
   isGameOver = true;
   }  

 // MOVE THE CAT
 
 if (isMovingRight === true) {
  catX += 2
} else if (isMovingLeft === true) {
  catX -= 2
}
else if (isMovingUp === true ) {
  catY -=2
}
else if (isMovingDown === true) {
  catY += 2
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
      console.log ("We are going down")
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

 
 