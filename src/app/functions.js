import { 
  header,
  instructionWrapper,
  roundWrapper,
  roundDiv,
  roundInput,
  optionsWrapper,
  gameOptions,
  rockBorder,
  paperBorder,
  scissorBorder,
  startBtn,
  restartBtn,
  pointWrapper,
  usrPointDiv,
  cpuPointDiv,
  finalMessageDiv,
  nextRoundBtn,
} from './variables';

let usrPoints = 0;
let cpuPoints = 0;
let round = 1;

// Setup the game UI
export const setupInterface = () => {
    roundDiv.textContent = String(round);
  
    pointWrapper.style.display = "block";
    startBtn.parentElement.style.display = "none";
    roundInput.parentElement.style.display = "none";
    optionsWrapper.style.display = "block";
    roundWrapper.style.display = "block";
    restartBtn.style.display = "block";
    header.style.display = "none";
    instructionWrapper.style.display = "none";

    usrPointDiv.textContent = '0';
    cpuPointDiv.textContent = '0';
}

// Game initialization
export const gameInit = (e) => {
  // Get user and computer input
  let userChoice = e.target.id;
  let computerChoice = computerPlay().toLowerCase();

  // Console login the options :)
  console.log('User: Choice', e.target.id);
  console.log('Computer Choice:', computerChoice);

  // Play round and check current round
  playRound(userChoice, computerChoice);
  checkCurrentRound();
}

// Logic fo the Round
export const playRound = (userChoice, computerChoice) => {
  resetClasses();
  checkWinner(userChoice, computerChoice);
}

// Check the current round
export const checkCurrentRound = () => {
  if (round > roundInput.value) {
    if (usrPoints > cpuPoints) {
      nextRoundBtn.style.display = 'none';
      removeHandler();
      finalMessageDiv.classList.add('win-text');
      finalMessageDiv.textContent = `You win the match!`;
    } else if (usrPoints < cpuPoints) {
      nextRoundBtn.style.display = 'none';
      removeHandler();
      finalMessageDiv.classList.add('lose-text');
      finalMessageDiv.textContent = `You lose the match!`;
    } else {
      nextRoundBtn.style.display = 'none';
      removeHandler();
      finalMessageDiv.classList.add('draw-text');
      finalMessageDiv.textContent = `You have a Draw!`;
    }
  // The game was not finished:
  } else {
    // Disable click for options until the Next Button is clicked
    removeHandler();
    // Show next round button
    nextRoundBtn.style.display = "block";
    // Restart Game Event
    restartBtn.addEventListener('click', resetGame)
    // Next Round Click Event
    nextRoundBtn.addEventListener('click', nextRoundLogic)
  }
}

export const nextRoundLogic = () => {
  resetClasses();
  roundDiv.textContent = String(round);
  nextRoundBtn.style.display = 'none';
  // Make click options available again
  gameOptions.forEach(choice => {
    choice.addEventListener('click', gameInit);
  })
}

// Check the winner of the round
export const checkWinner = (userChoice, computerChoice) => {
  // Tie Game
  if (userChoice === computerChoice) {
    // Tie with rocks
    if (userChoice === 'rock' && computerChoice === 'rock') {
      rockBorder.classList.add('draw');
    // Tie with paper
    } else if (userChoice === 'paper' && computerChoice === 'paper') {
      paperBorder.classList.add('draw');
    // Tie with scissors
    } else if (userChoice === 'scissor' && computerChoice === 'scissor') {
      scissorBorder.classList.add('draw');
    } 
  // Rock win over Scissor
  } else if (userChoice === 'rock' && computerChoice === 'scissor') {
    usrPoints += 1;
    round += 1;
    rockBorder.classList.add('win');
    scissorBorder.classList.add('lose');
    usrPointDiv.textContent = String(usrPoints);
  // Rock lose by Paper
  } else if (userChoice === 'rock' && computerChoice === 'paper') {
    cpuPoints += 1;
    round += 1;
    rockBorder.classList.add('lose');
    paperBorder.classList.add('win');
    cpuPointDiv.textContent = String(cpuPoints);
  // Scissor win over Paper
  } else if (userChoice === 'scissor' && computerChoice === 'paper') {
    usrPoints += 1;
    round += 1;
    scissorBorder.classList.add('win');
    paperBorder.classList.add('lose');
    usrPointDiv.textContent = String(usrPoints);
  // Sissor lose over Rock
  } else if (userChoice === 'scissor' && computerChoice === 'rock') {
    cpuPoints += 1;
    round += 1;
    rockBorder.classList.add('win');
    scissorBorder.classList.add('lose');
    cpuPointDiv.textContent = String(cpuPoints);
  // Paper win over Rock
  } else if (userChoice === 'paper' && computerChoice === 'rock') {
    usrPoints += 1;
    round += 1;
    paperBorder.classList.add('win');
    rockBorder.classList.add('lose');
    usrPointDiv.textContent = String(usrPoints);
  // Paper lose over Scissor
  } else {
    cpuPoints += 1;
    round += 1;
    paperBorder.classList.add('lose');
    scissorBorder.classList.add('win');
    cpuPointDiv.textContent = String(cpuPoints);
  }
}

// Get computer ramdon input
export const computerPlay = () => {
  let number = Math.floor(Math.random() * 3);
  let choise;

  if (number === 1) {
    choise = 'paper';
  } else if (number === 2) {
    choise = 'scissor';
  } else {
    choise = 'rock';
  }

  return choise;
}

// Disable click event for each game option
export const removeHandler = () => {
  // Loop trough each option
  gameOptions.forEach(choice => {
    choice.removeEventListener("click", gameInit);
  })
}

// Reset the game
export const resetGame = () => {
  resetClasses();
  usrPoints = 0;
  cpuPoints = 0;
  round = 1;
  roundDiv.textContent = String(round);
  usrPointDiv.textContent = '0';
  cpuPointDiv.textContent = '0';
  optionsWrapper.style.display = "none";
  roundWrapper.style.display = "none";
  restartBtn.style.display = "none";
  startBtn.parentElement.style.display = "block";
  roundInput.parentElement.style.display = "block";
  finalMessageDiv.classList.remove('draw-text', 'win-text', 'lose-text');
  finalMessageDiv.textContent = '';
  nextRoundBtn.style.display = "none";
  pointWrapper.style.display = "none";
  header.style.display = "block";
  instructionWrapper.style.display = "block";
}

// Function to reset the result color of the options
export const resetClasses = () => {
  rockBorder.classList.remove('draw', 'win', 'lose');
  paperBorder.classList.remove('draw', 'win', 'lose');
  scissorBorder.classList.remove('draw', 'win', 'lose');
}
