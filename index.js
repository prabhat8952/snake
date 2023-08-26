let inputDir = { x: 0, y: 0 };
//initialization of all music
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3");
const musicsound = new Audio("Snake Game - Theme Song.mp3");
const movesound = new Audio("move.mp3");

let scorebox=0;
let speed = 9;
let lastime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 7, y: 6 };

//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastime) / 1000 < 1 / speed) {
    return;
  }
  lastime = ctime;
  gameEngine();
}


function isCollapse(snake)
{
  //if you bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }
    //if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        return true;

    

}   



function gameEngine() {
  //part1:Update the snake array and food
  if(isCollapse(snakeArr))
  {
    gameoversound.play();
    musicsound.pause();
    inputDir={x:0,y:0};
    alert("Game is Over! Press an key to play again.");
    snakeArr = [{ x: 13, y: 15 }];
    musicsound.play();
    score=0;
  }
// if u have eaten the food ,increment the score and regernerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
{
    foodsound.play();
    scorebox+=1;
    if(scorebox>hiscoreval)
    {
        hiscoreval=scorebox;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscorebox.innerHTML="Hiscore: "+hiscoreval;


    }
    score.innerHTML="Score: "+scorebox;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
}
//moving the snake
for(let i=snakeArr.length-2;i>=0;i--)
{
    
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;

  //part2.1:diplay the snake 
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
   //part2.2:display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML="Hiscore: "+hiscore;
}




window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
        inputDir.x=0;
        inputDir.y=-1;
      console.log("arrow up");
      break;
    case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
      console.log("arrow down");
      break;
    case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
      console.log("arrow left");
      break;
    case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
      console.log("arrow right");
      break;
    default:
        break;
  }
});
