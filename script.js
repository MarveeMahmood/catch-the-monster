
// get html elements
const monster = document.querySelector("#monster");
const gameArea = document.querySelector("#game-area");

// move the monster
function moveMonster () {
    const maxX = gameArea.clientWidth - monster.offsetWidth;
    const maxY = gameArea.clientHeight - monster.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    monster.style.left = randomX + "px";
    monster.style.top = randomY + "px";
}

// click listener for the monster
monster.addEventListener("click", function() {
    moveMonster();
});