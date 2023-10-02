// DOM variables
const playBtn = document.querySelector('#play-btn');
const stopBtn = document.querySelector('#stop-btn');
const keys = document.querySelectorAll('.key');
const score = document.querySelector('.result');
const modalDisplay = document.querySelector('#modal-msg');
const overlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-btn');

// Global variables
let gameScore = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;
let gameThemeSong;
let pianoSound;
const doh = new sound('do-80236.mp3');
const re = new sound('re-78500.mp3');
const mi = new sound('mi-80239.mp3');
const fa = new sound('fa-78409.mp3');
const sol = new sound('sol-101774.mp3');
const la = new sound('la-80237.mp3');
const ti = new sound('si-80238.mp3');

// Game sound function - adapted from w3schools
function sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

// Random function
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


clickPlay = () => {
    if (clickSound.paused) clickSound.play();
    else clickSound.currentTime = 0;
}

const clickCircle = (i) => {

    if (i !== active) {
        return endGame();
    } else if (i === active) {
        if ((i === 0) || (i === 7)) pianoSound = doh;
        else if (i === 1) pianoSound = re;
        else if (i === 2) pianoSound = mi;
        else if (i === 3) pianoSound = fa;
        else if (i === 4) pianoSound = sol;
        else if (i === 5) pianoSound = la;
        else if (i === 6) pianoSound = ti;
        
        pianoSound.play();
        clickPlay();
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
        const newActive = getRandomNumber(0, 7);
        if (newActive !== active) return newActive;

        return pickNew(active);
    }
}

const showModal = () => overlay.classList.toggle('visible');

const endGame = () => {
    clearTimeout(timer);

    showModal()

    gameThemeSong = new sound('dark-evil-piano-32205.mp3');
    gameThemeSong.play();
    
    // resetGame();
}

const resetGame = () => {
    window.location.reload();
}



// Add event listeners to variables
playBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', endGame);
modalCloseBtn.addEventListener('click', resetGame);
