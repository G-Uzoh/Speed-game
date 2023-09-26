// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const keys = document.querySelectorAll('.key');
const score = document.querySelector('.result');

// Global variables
let gameScore = 0;
let timer;
let pace = 1000;
let currentKey = 0;
let rounds = 0;

// Random function
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const clickCircle = (i) => {

    if (i !== currentKey) {
        return endGame();
    }

    console.log(`Circle at index ${i} was clicked`);
    rounds--;
    gameScore += 1;
    score.textContent = gameScore;
}

// const enableEvents = () => {
//     keys.forEach(key => {
//         key.st
//     })
// }

// Start game function
const startGame = () => {
    if (rounds >= 3) return endGame();

    const activeKey = pickNewKey(currentKey);

    keys[activeKey].classList.toggle('active');
    keys[currentKey].classList.remove('active');

    // Sets the value of activeKey to currentKey
    currentKey = activeKey;

    timer = setTimeout(startGame, pace);
    pace -= 10;
    rounds++;
    
    function pickNewKey(currentKey) {
        const activeKey = getRandomNumber(0, 3);
        if (activeKey !== currentKey) {
            return activeKey;
        }
        return pickNewKey(currentKey);
    }
    console.log(currentKey);
}

// End game function
const endGame = () => {
    console.log('Game ended!');
    clearTimeout(timer);

    resetGame();
}

// Reset game function
const resetGame = () => {
    window.location.reload();
}

// Add event listeners to variables
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
keys.forEach((key, i) => {
    key.addEventListener('click', () => clickCircle(i));
});