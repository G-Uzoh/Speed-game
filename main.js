// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const pianoKeys = document.querySelectorAll('.key');
const score = document.querySelector('.result');
const volumeSlider = document.querySelector('.volume-slider input');
const showKeysBtn = document.querySelector('.show-key input');
const gameHelpBtn = document.querySelector('.help-btn');
const gameInstructionsOverlay = document.querySelector('.instruction-overlay');
const instructionsCloseBtn = document.querySelector('#close-btn');
const modalGameScore = document.querySelector('#result');
const modalDisplayMessage = document.querySelector('#modal-msg');
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
const allKeysList = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm'];

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

// Piano utility function
const displayKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle('show'));
}

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
        
        pianoSound.currentTime = 0;
        pianoSound.play();

        handleVolume(i);
    }

    rounds--;
    gameScore += 1;
    score.textContent = gameScore;
    modalGameScore.textContent = gameScore;

    // Game over message display
    let message = (modalGameScore.textContent > 20) ? 'Congratulations! You are a virtuoso pianist' : (modalGameScore.textContent > 10) ? 'Good job, you\'re at intermediate level. You need to practise more' : 'You\'re at amateur level. Please study the basics';

    modalDisplayMessage.textContent = message;
}

// Add a click event listener to each key
pianoKeys.forEach((key, i) => {
    key.addEventListener('click', () => playNote(i));
});

// HTML pointer events
const enableEvents = () => {
    pianoKeys.forEach(key => {
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

    pianoKeys[newActive].classList.toggle('active');
    pianoKeys[active].classList.remove('active');

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

// Game instructions visibility
const showInstructions = () => {
    gameInstructionsOverlay.classList.contains('visible') ? gameInstructionsOverlay.classList.remove('visible') : gameInstructionsOverlay.classList.add('visible');
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

// Reset game after game over
const resetGame = () => {
    window.location.reload();
}

// Sound volume function
const handleVolume = (e) => {
    pianoSound.volume = e.target.value;
}

// Add event listeners to variables
volumeSlider.addEventListener('input', handleVolume);
showKeysBtn.addEventListener('click', displayKeys);
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
gameHelpBtn.addEventListener('click', showInstructions);
instructionsCloseBtn.addEventListener('click', showInstructions);
modalCloseBtn.addEventListener('click', resetGame);

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    const key = e.key;

    const keyIndex = allKeysList.indexOf(key);

    if (keyIndex === -1) return;

    if (keyIndex !== active) return endGame();
    else if (keyIndex === active) {
        if (keyIndex === 0) pianoSound = c;
        else if (keyIndex === 1) pianoSound = db;
        else if (keyIndex === 2) pianoSound = d;
        else if (keyIndex === 3) pianoSound = eb;
        else if (keyIndex === 4) pianoSound = e;
        else if (keyIndex === 5) pianoSound = f;
        else if (keyIndex === 6) pianoSound = gb;
        else if (keyIndex === 7) pianoSound = g;
        else if (keyIndex === 8) pianoSound = ab;
        else if (keyIndex === 9) pianoSound = a;
        else if (keyIndex === 10) pianoSound = bb;
        else if (keyIndex === 11) pianoSound = b;
    }

    pianoSound.currentTime = 0;
    pianoSound.play();

    handleVolume(key);

    rounds--;
    gameScore += 1;
    score.textContent = gameScore;
    modalGameScore.textContent = gameScore;

    // Game over message display
    let message = (modalGameScore.textContent > 20) ? 'Congratulations! You are a virtuoso pianist' : (modalGameScore.textContent > 10) ? 'Good job, you\'re at intermediate level. You need to practise more' : 'You\'re at amateur level. Please study the basics';

    modalDisplayMessage.textContent = message;
});