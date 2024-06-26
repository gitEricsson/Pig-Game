'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const rotate = document.querySelector('#rotate');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// Starting conditions
score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let loading = false;
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // To prevent double click
        if (loading)
            return;
        loading = true;
        // 1. Display dice
        diceEl.classList.remove('hidden');
        diceEl.classList.add('loading');
        // 2. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 3. Wait for dice roll
        (() => {
            setTimeout(function () {
                diceEl.src = `dice-${dice}.png`;
                // 4. Check for rolled 1
                if (dice !== 1) {
                    //Add dice to current score
                    currentScore += dice;
                    document.getElementById(`current--${activePlayer}`).textContent =
                        currentScore.toString();
                }
                else {
                    // Switch to next player
                    switchPlayer();
                }
                diceEl.classList.remove('loading');
                loading = false;
            }, 1000);
        })();
    }
});
btnHold.addEventListener('click', function () {
    var _a, _b;
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer].toString();
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            (_a = document
                .querySelector(`.player--${activePlayer}`)) === null || _a === void 0 ? void 0 : _a.classList.add(`player--winner`);
            (_b = document
                .querySelector(`.player--${activePlayer}`)) === null || _b === void 0 ? void 0 : _b.classList.remove(`player--active`);
        }
        else {
            // Switch to the next player
            switchPlayer();
        }
    }
});
btnNew.addEventListener('click', function () {
    var _a, _b;
    playing = true;
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    (_a = document
        .querySelector(`.player--${activePlayer}`)) === null || _a === void 0 ? void 0 : _a.classList.remove(`player--winner`);
    (_b = document
        .querySelector(`.player--${activePlayer}`)) === null || _b === void 0 ? void 0 : _b.classList.add(`player--active`);
    activePlayer = 0;
    score0El.textContent = '0';
    score1El.textContent = '0';
    diceEl.classList.add('hidden');
});
const removeMessage = function () {
    setTimeout(function () {
        rotate.classList.add('hide');
    }, 4000);
};
removeMessage();
