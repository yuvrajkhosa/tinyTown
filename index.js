var balls = [];
var infectedCount = 1;
var population = 15;
let newBall = false;
var counter = -1;
var firstTime = true;
var playing = false;
const title = "Trouble In TinyTown";
var typewriterSound = new Audio("typewriter.wav");


function removePopup(){
  console.log("HGel");
  var node = document.getElementById("popup");
  while(node.firstChild){
    node.removeChild(node.firstChild);
  }
  animateTitle()
}

function animateTitle(){
  setTimeout(function(){
    let titleElement = document.getElementById("title");
    function callback(){
      console.log("Here");
      if(counter <= title.length - 1){
        let time = Math.floor(Math.random() * (400 - 300) + 300);
        titleElement.innerHTML += title.substring(counter, counter + 1);
        typewriterSound.play();
        counter++;

        setTimeout(callback, time);
      }
    }
    if(firstTime){
      firstTime = false;
      callback();
    }
  }, 1000);
}

function setup() {
  frameRate(60);
  createCanvas(1050, 750);
  balls.push(new Ball(10 + random(width - 10), 10 + random(height - 10), true)); //Create Ball at random Location
  for (let i = 0; i < population - 1; i++) {
    balls.push(new Ball(10 + random(width - 10), 10 + random(height - 10), false));
  }
  noLoop();
}
function draw() {
  background(100);
  for (let ball of balls) {
    ball.show();
    ball.walls();
  }

  for (let i = 0; i < balls.length; i++) { //Loop through all balls and check against each other for collision
    for (let j = 0; j < balls.length; j++) {
      if (i == j) { //Not check against same ball
        break;
      }
      if (balls[i].bounce(balls[j])) { //If collision
        if (balls.length < 250) { //AND balls length is not over 200 | Population CAP is 200
          let infected = false; //For now make infected to false
          //IF atleast ONE of the parents were infected
          if (balls[i].isInfected || balls[j].isInfected) {
            infected = true;
            infectedCount++;
          }
          population++;
          //Each person can have 1 offspring
          balls.push(new Ball(10 + random(width - 10), 10 + random(height - 10), infected)); //New ball at random location, and infected if one parent was infected
          console.log(`Population: ${population}, Infected: ${infectedCount}`);

        }
      }
    }
  }

  if (infectedCount > 20 && population > 40 && counter % 5 == 0) { //IF more than 10 infected AND more than 20 people in TOTAL try kill someone | Increase counter % x to increase time between death chance
    counter = 0;
    if (Math.floor(Math.random() * 25) + 1 == 2) { //Small Chance of a death
      let rand = Math.floor(Math.random() * balls.length); //Pick random ball from array
      if (balls[rand].isInfected) { //Check if that ball was infected
        infectedCount--; //If yes, decrease infected count
      }
      population--; //Decrease population
      balls.splice(rand, 1); //Remove that ball from array
      console.log(`DEATH | Population: ${population}, Infected: ${infectedCount}`);
    }
  }
  counter++;



}


function buttonClicked() {
  if (!playing) {
    loop();
    playing = true;
    document.getElementById("loopButton").innerHTML = "Stop";
    document.getElementById("loopButton").style.backgroundColor = "red";
  } else {
    noLoop();
    playing = false;
    document.getElementById("loopButton").style.backgroundColor = "limeGreen";
    document.getElementById("loopButton").innerHTML = "Start";
  }
}
