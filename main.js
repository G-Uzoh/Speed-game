// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const keys = document.querySelectorAll('.key');
const score = document.querySelector('.result');
const modalDisplay = document.querySelector('#modal-msg');
const overlay = document.querySelector('.modal-overlay');

// Global variables
let gameScore = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

// Random function
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const clickCircle = (i) => {

    if (i !== active) {
        return endGame();
    }

    rounds--;
    gameScore += 1;
    score.textContent = gameScore;
}

keys.forEach((key, i) => {
    key.addEventListener('click', () => clickCircle(i));
});

const enableEvents = () => {
    keys.forEach(key => {
        key.style.pointerEvents = 'auto';
    });
}

const startGame = () => {
    if (rounds >= 3) return endGame();

    enableEvents();
    const newActive = pickNew(active);

    keys[newActive].classList.toggle('active');
    keys[active].classList.remove('active');

    active = newActive;

    timer = setTimeout(startGame, pace);

    pace -= 10;
    rounds++;

    function pickNew(active) {
        const newActive = getRandomNumber(0, 3);
        if (newActive !== active) return newActive;

        return pickNew(active);
    }
}

const endGame = () => {
    clearTimeout(timer);

    resetGame();
}

const resetGame = () => {
    window.location.reload();
}

// Add event listeners to variables
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
