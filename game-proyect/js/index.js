
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro"); 

const background = new Image();
background.src = "../images/black-background.jpeg"; 
const cat = new Image(); 
cat.src = "../images/cat.png"


let isGameOver = false;
let gameId = 0;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
    startGame();
  };


  function startGame() {
    console.log(gameId);
    startScreen.style.display = "none"; 
    ctx.drawImage(background, 0, 0, canvas.width , canvas.height);
    ctx.drawImage(cat, 0, 0,);   

  if(isGameOver) {
    cancelAnimationFrame(gameId);
} else {
  gameId = requestAnimationFrame(startGame); 
}

if (gameId === 2000) {
   isGameOver = true;
   }  
  }


window.addEventListener("keydown", (e) => {
  console.log(e.key)
  switch (e.key) {
    case "w":
      connsole.log("pressed w key")
      break
      case "w":
      connsole.log("pressed w key")
      break
      case "w":
      connsole.log("pressed w key")
      break
      case "w":
      connsole.log("pressed w key")
      break  
  }
})

 }
 
 