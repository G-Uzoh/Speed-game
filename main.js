// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const keys = document.querySelectorAll('.key');
const score = document.querySelector('.result');
const modalDisplay = document.querySelector('#modal-msg');
const overlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-btn');
const doh = document.querySelector('#doh');
const re = document.querySelector('#re');
const mi = document.querySelector('#mi');
const fa = document.querySelector('#fa');
const sol = document.querySelector('#sol');
const la = document.querySelector('#la');
const ti = document.querySelector('#ti');
const highDoh = document.querySelector('#high-doh');
const theme = document.querySelector('#theme');

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

const clickPlay = () => {
    if (clickSound.paused) clickSound.play();
    else clickSound.currentTime = 0;
}

const clickCircle = (i) => {

    if (i !== active) {
        return endGame();
    } else if (i === active) {
        if (i === 0) pianoSound = doh;
        else if (i === 1) pianoSound = re;
        else if (i === 2) pianoSound = mi;
        else if (i === 3) pianoSound = fa;
        else if (i === 4) pianoSound = sol;
        else if (i === 5) pianoSound = la;
        else if (i === 6) pianoSound = ti;
        else if (i === 7) pianoSound = highDoh;
        
        pianoSound.play();
        // clickPlay();
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
