'use strict';

const colorBox = document.querySelector('.color');
const btnsChoice = document.querySelectorAll('.btn-choice');
const roundElement = document.querySelector('.round');
const scoreElement = document.querySelector('.score');
const messageElement = document.querySelector('.message');

const ROUND_DELAY_MS = 2000;
const SCORE_PER_ROUND = 1;

let currentRound = 1;
let currentScore = 0;
let btnCorrect;

/**
 * Main Functionality
 *
 * 01. Generate round
 * 02. Start next round
 * 03. Make buttons interactive
 * 04. Round won and lost
 */

/**
 * 01. Generate round
 *
 * Generates a new round.
 * Generates a correct answer, and assigns that answer to a random button.
 * Sets the `.color` element's color according to the right answer.
 * Generates a set of random wrong answers and assigns them to all the other
 * buttons.
 */

const generateRound = () => {
    const correctAnswer = generateRandomHexColor();
    const randomIndex = Math.floor(Math.random() * btnsChoice.length);
    const answerCorrect = btnsChoice[randomIndex];

    answerCorrect.textContent = correctAnswer;
    colorBox.style.backgroundColor = correctAnswer;

    btnsChoice.forEach((btn, i) => {
        if (i !== randomIndex) {
            btn.textContent = generateRandomHexColor();
        }
    });

    console.log(answerCorrect);
    btnCorrect = answerCorrect;
    makeBtnsInteractive();
};

/**
 * 02. Start new round
 *
 * Starts the next round after a predefined delay.
 * Disables all the buttons until the next round is started so that players are
 * not able to multi-click any answer.
 * Increases the round number, and sets the text of related elements accordingly.
 */

const startNextRound = () => {
    btnsChoice.forEach((btn) => {
        btn.disabled = true;
    });

    scoreElement.textContent = currentScore;
    roundElement.textContent = 'starting...';

    currentRound += 1;
    setTimeout(() => {
        btnCorrect.classList.remove('btn-correct');
        generateRound();
        roundElement.textContent = currentRound;
        displayMessage('Choose an option...');
        btnsChoice.forEach((btn) => {
            btn.disabled = false;
        });
    }, ROUND_DELAY_MS);
};

/**
 * 03. Make buttons interactive
 *
 * Adds suitable event listeners to each button depending upon if it is the
 * correct answer.
 * Removes all previously added event listeners before adding more.
 */

const makeBtnsInteractive = () => {
    btnsChoice.forEach((btn) => {
        btn.removeEventListener('click', roundWon);
        btn.removeEventListener('click', roundLost);

        if (btn === btnCorrect) {
            btn.addEventListener('click', roundWon);
        } else {
            btn.addEventListener('click', roundLost);
        }
    });
};

/**
 * 04. Round won and lost
 *
 * Increase player's score if the round was won.
 * Set the `.score` element's text to the `currentScore`.
 * Display message accordingly.
 */

const roundWon = () => {
    currentScore += SCORE_PER_ROUND;
    scoreElement.textContent = currentScore;
    startNextRound();
    displayMessage('Correct Answer!', 'correct');
};

const roundLost = () => {
    startNextRound();
    displayMessage('Incorrect Answer!', 'incorrect');
    btnCorrect.classList.add('btn-correct');
};

/**
 * Additional Functionality
 *
 * 01. Generate random hex color
 * 02. Display message
 */

/**
 * 01. Generate random hex color
 *
 * Generates a random hex color.
 */

const generateRandomHexColor = () => {
    const num = Math.floor(Math.random() * Math.pow(16, 6));
    const color = `#${num.toString(16).padStart(6, '0')}`;
    return color;
};

/**
 * 02. Display message
 *
 * Sets the `messageElement`'s text according to whatever has been passed in.
 * Adds a class to the element depending upon if the answer was correct.
 */

const displayMessage = (message, correctOrIncorrect = false) => {
    messageElement.classList.remove('correct', 'incorrect');
    messageElement.textContent = message;
    if (correctOrIncorrect) messageElement.classList.add(correctOrIncorrect);
};

document.addEventListener('DOMContentLoaded', generateRound);
