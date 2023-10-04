// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const keys = document.querySelectorAll('.key');
const score = document.querySelector('.result');
const modalDisplay = document.querySelector('#modal-msg');
const overlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-btn');

// Piano note sounds and theme song
const c = document.querySelector('#C');
const db = document.querySelector('#Db');
const d = document.querySelector('#D');
const eb = document.querySelector('#Eb');
const e = document.querySelector('#E');
const f = document.querySelector('#F');
const gb = document.querySelector('#Gb');
const g = document.querySelector('#G');
const ab = document.querySelector('#Ab');
const a = document.querySelector('#A');
const bb = document.querySelector('#Bb');
const b = document.querySelector('#B');
const theme = document.querySelector('#theme');

// Variables for keyboard accessibility
const whiteKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const blackKeys = ['s', 'd', 'g', 'h', 'j'];
const allKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 's', 'd', 'g', 'h', 'j'];

const whitePianoKeys = document.querySelectorAll('.key.white');
const blackPianoKeys = document.querySelectorAll('.key.black');

// Global variables
let gameScore = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let gameThemeSong;
let pianoSound;

// Random function
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const clickPlay = () => {
//     if (clickSound.paused) clickSound.play();
//     else clickSound.currentTime = 0;
// }

// Piano sound function
const playNote = (i) => {

    if (i !== active) {
        return endGame();
    } else if (i === active) {
        if (i === 0) pianoSound = c;
        else if (i === 1) pianoSound = db;
        else if (i === 2) pianoSound = d;
        else if (i === 3) pianoSound = eb;
        else if (i === 4) pianoSound = e;
        else if (i === 5) pianoSound = f;
        else if (i === 6) pianoSound = gb;
        else if (i === 7) pianoSound = g;
        else if (i === 8) pianoSound = ab;
        else if (i === 9) pianoSound = a;
        else if (i === 10) pianoSound = bb;
        else if (i === 11) pianoSound = b;
        
        if (pianoSound.paused) pianoSound.play();
        else pianoSound.currentTime = 0;
    }

    rounds--;
    gameScore += 1;
    score.textContent = gameScore;
}

keys.forEach((key, i) => {
    key.addEventListener('click', () => playNote(i));
});

// HTML pointer events
const enableEvents = () => {
    keys.forEach(key => {
        key.style.pointerEvents = 'auto';
    });
}

stopBtn.classList.add('hide');

// Game in progress
const startGame = () => {

    playBtn.classList.add('hide');
    stopBtn.classList.remove('hide');
    
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
        const newActive = getRandomNumber(0, 11);
        if (newActive !== active) return newActive;

        return pickNew(active);
    }
}

// Modal visibility
const showModal = () => overlay.classList.toggle('visible');

// Game ends
const endGame = () => {
    clearTimeout(timer);

    showModal()

    gameThemeSong = theme;
    gameThemeSong.play();
}

const resetGame = () => {
    window.location.reload();
}

// Add event listeners to variables
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
modalCloseBtn.addEventListener('click', resetGame);