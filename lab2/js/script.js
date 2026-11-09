alert("running external JS code!")

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);

document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let attemptsLeft = 7;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;
   attemptsLeft = 7;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //hiding stats
   document.querySelector("#stats").hidden = true;

   //unhiding guess button
   document.querySelector("#guessBtn").style.display = "inline"
  
   //adding focus to textbox
   document.querySelector("#playerGuess").focus();

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();
   playerGuess.value = "";

   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";

   document.querySelector("#guesses").textContent = "";
   
}

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("player guess: " + guess);
    if (guess < 1 || guess > 99){
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    attemptsLeft--;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (guess == randomNumber){
        ++wins
        feedback.textContent = "Congrats! You guessed correctly!"
        feedback.style.color = "green"
        gameOver();
    }else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attemptsLeft").textContent = attemptsLeft;
        if (attempts == 7){
            ++losses
            feedback.textContent = "No more guesses, you are a loser!"
            feedback.style.color = "red";
            gameOver();
        }else if(guess > randomNumber){
            feedback.textContent = "Guess was high";
        }else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //Hides Guess Button
    resetBtn.style.display = "inline"; //Reveals Reset Button
    document.querySelector("#winsDisplay").textContent = wins;
    document.querySelector("#lossesDisplay").textContent = losses;
    document.querySelector("#stats").hidden = false;
}
