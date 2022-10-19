
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro"); 
const gameBoard = document.querySelector("#game-board"); 
const gameOver = document.querySelector("#gameover"); 

//IMAGES
const background = new Image();
background.src = "../images/black-background.png"; 
const cat = new Image(); 
cat.src = "../images/cat.png"
const ghost = new Image(); 
ghost.src = "../images/ghost.png"; 

//SCORE VARIABLES

let score = document.querySelector("timer");
let timer; 


//MOVING STUFF
let isGameOver = false;
let gameId = 0;
let catX = 50;
let catY = 600;
let ghostX = 700;
let ghostY = 300;
const catHeight = -200;
const catWidth = 200;
const ghostHeight = 100;
const ghostWidth = 200;
let isMovingRight = false; // ARROW KEYS
let isMovingLeft = false;  // ARROW KEYS
let isMovingUp = false;   // ARROW KEYS
let isMovingDown = false; // ARROW KEYS
let monsters = [{img: ghost, x: ghostX, y: ghostY, height: ghostHeight, width: ghostWidth},
  {img: ghost, x: ghostX+700, y: ghostY, height: ghostHeight, width: ghostWidth},
  {img: ghost, x: ghostX+400, y: ghostY, height: ghostHeight, width: ghostWidth},
  {img: ghost, x: ghostX+300, y: ghostY, height: ghostHeight, width: ghostWidth}]; 

// FUNCTION SCORE

function timeIsRunnning() {
  var sec = 0;
  var timer = setInterval(function(){
      document.getElementById('timer').innerHTML='00:'+sec;
      sec++;
      if(count == 59) clearInterval(timer);
     }, 1000);
}


//GHOST

const ghostImage = {
  ghost: ghost,
  x: 0,
  speed: -1,

  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },

  draw: function() {
    ctx.drawImage(this.ghost, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.ghost, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.ghost, this.x - this.ghost.width, 0);
    }
  },
};

function updateCanvas() {
  ghostImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ghostImage.draw();

  requestAnimationFrame(updateCanvas);
}


//START BUTTON AND HIDE CANVAS 
window.onload = () => {
  canvas.style.display = "none"; // THIS HIDE THE CANVAS
  gameBoard.style.display = "none";
  gameOver.style.display = "none"; 
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
  canvas.style.display = "block"; // THIS IS THE BACKGROUND
    startGame();}
    timeIsRunnning()
  document.getElementById("end-button").onclick = () => {
     console.log("game over");
     isGameOver = false;
     gameId = 0;
     canvas.style.display = "block";
     gameOver.style.display = "none";
    startGame();}  
  

function startGame() {
    console.log(gameId);
    startScreen.style.display = "none"; 
    gameBoard.style.display = "flex"; 
    ctx.drawImage(background, 0, 0, canvas.width , canvas.height); // THIS IS THE SIZE FROM BACKGROUND
    ctx.drawImage(cat, catX, catY, catWidth, catHeight);   // THIS IS THE SIZE FROM THE CAT 
// GAME OVER 

   //function endGame () {
    if(isGameOver == true) { 
    cancelAnimationFrame(gameId);
    gameOver.style.display = "flex"
    console.log("game over");
    canvas.style.display = "none";
    }  
    else {
    gameId = requestAnimationFrame(startGame); 
    }
   
  // COLLISION
  
    for (let i= 0; i< monsters.length; i++) {
      let currentMonster = monsters[i] 
      ctx.drawImage(currentMonster.img, currentMonster.x, currentMonster.y, currentMonster.width, currentMonster.height);
      currentMonster.x -=3
      if(currentMonster.y > canvas.height){
        currentDog.y = -500;
      }
      if(currentMonster.y + currentMonster.width > catY &&
         catX + catWidth > currentMonster.x &&
         catX < currentMonster.x + currentMonster.width &&
         catY + currentMonster.height > currentMonster.y
         ){
          isGameOver = true;
         }   
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

 
 