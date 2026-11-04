
// get html elements
const monster = document.querySelector("#monster");
const gameArea = document.querySelector("#game-area");

const scoreElement = document.querySelector("#score");
let score = 0;

// move the monster
function moveMonster () {
    const maxX = gameArea.clientWidth - monster.offsetWidth; // available width for the monster to move
    const maxY = gameArea.clientHeight - monster.offsetHeight; // available height for the monster to move

    const randomX = Math.random() * maxX; // new random x position for the monster
    const randomY = Math.random() * maxY; // new random y position for the monster

    monster.style.left = randomX + "px"; //
    monster.style.top = randomY + "px";
}

// click listener to store the score and move the monster
monster.addEventListener("click", function() {

    // Increase score
    score++;

    
    scoreElement.textContent = score;

    
    moveMonster();
});

// click listener for the monster
monster.addEventListener("click", function() {
    moveMonster();
});