'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0') as HTMLElement;
const player1El = document.querySelector('.player--1') as HTMLElement;
const score0El = document.querySelector('#score--0') as HTMLElement;
const score1El = document.getElementById('score--1') as HTMLElement;
const current0El = document.getElementById('current--0') as HTMLElement;
const current1El = document.getElementById('current--1') as HTMLElement;
const rotate = document.querySelector('#rotate') as HTMLElement;

const diceEl = document.querySelector('.dice') as HTMLImageElement;
const btnNew = document.querySelector('.btn--new') as HTMLButtonElement;
const btnRoll = document.querySelector('.btn--roll') as HTMLButtonElement;
const btnHold = document.querySelector('.btn--hold') as HTMLButtonElement;

// Starting conditions
score0El.textContent = '0';
score1El.textContent = '0';
diceEl.classList.add('hidden');

const scores: number[] = [0, 0];
let currentScore: number = 0;
let activePlayer: number = 0;
let playing: boolean = true;
let loading: boolean = false;

const switchPlayer = function (): void {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function (): void {
  if (playing) {
    // To prevent double click
    if (loading) return;
    loading = true;

    // 1. Display dice
    diceEl.classList.remove('hidden');
    diceEl.classList.add('loading');

    // 2. Generating a random dice roll
    const dice: number = Math.trunc(Math.random() * 6) + 1;

    // 3. Wait for dice roll
    (() => {
      setTimeout(function (): void {
        diceEl.src = `dice-${dice}.png`;

        // 4. Check for rolled 1
        if (dice !== 1) {
          //Add dice to current score
          currentScore += dice;
          document.getElementById(`current--${activePlayer}`).textContent =
            currentScore.toString();
        } else {
          // Switch to next player
          switchPlayer();
        }
        diceEl.classList.remove('loading');

        loading = false;
      }, 1000);
    })();
  }
});

btnHold.addEventListener('click', function (): void {
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

      document
        .querySelector(`.player--${activePlayer}`)
        ?.classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        ?.classList.remove(`player--active`);
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function (): void {
  playing = true;

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent = '0';

  document
    .querySelector(`.player--${activePlayer}`)
    ?.classList.remove(`player--winner`);
  document
    .querySelector(`.player--${activePlayer}`)
    ?.classList.add(`player--active`);

  activePlayer = 0;
  score0El.textContent = '0';
  score1El.textContent = '0';
  diceEl.classList.add('hidden');
});

const removeMessage = function (): void {
  setTimeout(function (): void {
    rotate.classList.add('hide');
  }, 4000);
};

removeMessage();
