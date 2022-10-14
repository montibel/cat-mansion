
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro"); 

const background = new Image();
background.src = "../images/black-background.jpeg"; 
const cat = new Image(); 
cat.src = "../images/cat.png"
let isGameOver = false;
let gameId = 0;
let catX = 200;
let catY = 500;
const catHeight = 100;
const catWidth = 70;
let isMovingRight = false;
let isMovingLeft = false;
let isMovingUp = false;
let isMovingDown = false;

window.onload = () => {
  canvas.style.display = "none"
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
  canvas.style.display = "block"
    startGame();
  };

  function startGame() {
    console.log(gameId);
    startScreen.style.display = "none"; 
    ctx.drawImage(background, 0, 0, canvas.width , canvas.height);
    ctx.drawImage(cat, catX, catY, catWidth, catHeight);   

if(isGameOver) {
    cancelAnimationFrame(gameId);
} else {
  gameId = requestAnimationFrame(startGame); 
}

if (gameId === 2000) {
   isGameOver = true;
   }  

 // Move the car
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
  //movement of the cat
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
  //stop the cat from moving
  document.addEventListener('keyup', () => {
    isMovingRight = false
    isMovingLeft = false
    isMovingUp = false
    isMovingDown = false 
  })
}
}

 
 