
// get html elements
const monster = document.querySelector("#monster");
const gameArea = document.querySelector("#game-area");

const scoreElement = document.querySelector("#score");

const timerElement = document.querySelector("#timer");
const startButton = document.querySelector("#start-button");

const difficultySelect = document.querySelector("#difficulty");
//console.log(difficultySelect.value);

const highScoreElement = document.querySelector("#high-score");

//sounds
const catchSound = new Audio("assets/sounds/catch.wav");
const startSound = new Audio("assets/sounds/start.wav");
const gameOverSound = new Audio("assets/sounds/game-over.wav");
const countdownSound = new Audio("assets/sounds/countdown.wav");
const successSound = new Audio("assets/sounds/success.wav");

//variables
let score = 0;
let timeLeft = 15; // fresh start!
let timerInterval;

let gameActive = false;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.textContent = highScore;

///////////////////////////////////// function to move the monster
function moveMonster () {
    const maxX = gameArea.clientWidth - monster.offsetWidth; // available width for the monster to move
    const maxY = gameArea.clientHeight - monster.offsetHeight; // available height for the monster to move

    const randomX = Math.random() * maxX; // new random x position for the monster
    const randomY = Math.random() * maxY; // new random y position for the monster

    monster.style.left = randomX + "px"; //
    monster.style.top = randomY + "px";
}

/////////////////////////////////////////// function to set the difficulty


function setDifficulty() {

    const difficulty = difficultySelect.value;

    let monsterSize;

    if (difficulty === "easy") {
       // monster.style.fontSize = "50px";
       monsterSize = 50;

    } else if (difficulty === "medium") {
        //monster.style.fontSize = "35px";
        monsterSize = 35;

    } else if (difficulty === "hard") {
        //monster.style.fontSize = "20px";
        monsterSize = 20;
    }
     if (score >= 10) {
        monsterSize = monsterSize - 15;
    }

    monster.style.fontSize = monsterSize + "px";// 
}

//////////////////////////////// function to set/start the timer


function startTimer() {

    if (gameActive === true) {
        return; // don't start a new timer, if the game is already active
    }

    gameActive = true; // set the game as active

    difficultySelect.disabled = true;

    score = 0;
    scoreElement.textContent = score; // reset the score display

    setDifficulty(); // reset the monster size based on the selected difficulty

    timeLeft = 15;
    timerElement.textContent = timeLeft; // reset the timer display

    timerInterval = setInterval(function() {
        timeLeft--;

       

        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval); // time is up, so stop ticking!

            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScore", score);// store the new high score in local storage
                highScoreElement.textContent = highScore;
            }

            gameOverSound.currentTime = 0;
            gameOverSound.play();

            alert("Time's up! Your score is: " + score); // show the final score
            gameActive = false; // set the game as inactive
            difficultySelect.disabled = false; // re-enable the difficulty select
        }
    }, 1000);
}



// monster click, click listener to store the score and move the monster
monster.addEventListener("click", function() {

    if (gameActive === false) {
        return; // if the game is not active, do nothing
    }

    score++;

    catchSound.currentTime = 0;
    catchSound.play();

    scoreElement.textContent = score;

    if (score >= 10) {
    //monster.style.fontSize = "15px";// make the monster smaller after 10 points
    setDifficulty(); // adjust the monster size based on the score and difficulty
    }
    
    moveMonster();
});

setDifficulty(); //call func on page load

        // // click listener for the monster
        // monster.addEventListener("click", function() {
        //     moveMonster();
        // });

// click listener for the start button
startButton.addEventListener("click", function() {

    startSound.currentTime = 0; // reset the start sound to the beginning
    startSound.play(); // play the start sound


    startTimer();
});

// // change listener for the difficulty select
// difficultySelect.addEventListener("change", function() {
//     console.log("Difficulty changed to: " + difficultySelect.value);   
// });


// change listener for the difficulty select
difficultySelect.addEventListener("change", function() {
    setDifficulty();
});