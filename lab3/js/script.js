document.querySelector("button").addEventListener("click", gradeQuiz);

//First Calls
displayQ4Choices();
displayQ7Choices();
displayQ8Choices();

//Globals
let score = 0;
let attempts = localStorage.getItem("total_attempts");
let totalScore = document.querySelector("#totalScore");

if (attempts === null) {
  attempts = 0;
} else {
  attempts = Number(attempts);
}


//Question Specific Code

//shuffleFunction for all multiple choices
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

//Question 4
function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

//Question 7
function displayQ7Choices() {
  let q7ChoicesArray = ["Alaska", "Texas", "New York", "Puerto Rico"];
  shuffleArray(q7ChoicesArray);

  let choicesContainer = document.querySelector("#q7Choices");
  choicesContainer.textContent = "";

  for (let choice of q7ChoicesArray) {
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q7";
    input.id = choice;
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

function displayQ8Choices() {
  let q8ChoicesArray = ["Grass Wonder", "Taiki Shuttle", "El Condor Pasa", "Matikanetannhauser"];
  shuffleArray(q8ChoicesArray);

  let choicesContainer = document.querySelector("#q8Choices");
  choicesContainer.textContent = "";

  for (let choice of q8ChoicesArray) {
    let input = document.createElement("input");
    input.type = "checkbox";
    input.name = "q8";
    input.id = choice.replaceAll(" ", "-");
    input.value = choice;

    let label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = choice;

    choicesContainer.appendChild(input);
    choicesContainer.appendChild(label);
    choicesContainer.appendChild(document.createTextNode(" "));
  }
}

//Grading Helpers

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "bg-success text-white";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "bg-warning text-white";
  setMarkImage(index, "xmark.png", "X mark");
}

//Grading function
function gradeQuiz() {
  document.querySelector("#validationFdbk").textContent = "";

  if (!isFormValid()) {
    return;
  }

  score = 0;
  let q1Response = document.querySelector("#q1").value.toLowerCase();
  let q2Response = document.querySelector("#q2").value;

  if (q1Response === "sacramento") {
    rightAnswer(1);
} else {
    wrongAnswer(1);
}

if (q2Response === "mo") {
    rightAnswer(2);
} else {
    wrongAnswer(2);
}

if (document.querySelector("#Jefferson").checked &&
    document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked &&
    !document.querySelector("#Franklin").checked) {
    rightAnswer(3);
} else {
    wrongAnswer(3);
}

let selectedQ4 = document.querySelector("input[name=q4]:checked");

if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
    rightAnswer(4);
} else {
    wrongAnswer(4);
}

let q5Response = document.querySelector("#q5").value.toLowerCase();

if (q5Response === "virginia") {
    rightAnswer(5);
} else {
    wrongAnswer(5);
}

let q6Response = document.querySelector("#q6").value;

if (q6Response === "hi") {
    rightAnswer(6);
} else {
    wrongAnswer(6);
}

let selectedQ7 = document.querySelector("input[name=q7]:checked");

if (selectedQ7 !== null && selectedQ7.value === "Puerto Rico") {
    rightAnswer(7);
} else {
    wrongAnswer(7);
}

if (document.querySelector("#Grass-Wonder").checked &&
    document.querySelector("#El-Condor-Pasa").checked &&
    document.querySelector("#Taiki-Shuttle").checked &&
    !document.querySelector("#Matikanetannhauser").checked) {
    rightAnswer(8);
} else {
    wrongAnswer(8);
}


let q9Response = document.querySelector("#q9").value;

if (q9Response === "ky") {
    rightAnswer(9);
} else {
    wrongAnswer(9);
}

let q10Response = document.querySelector("#q10").value;

if (q10Response === "We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.") {
    rightAnswer(10);
} else {
    wrongAnswer(10);
}

let totalScore = document.querySelector("#totalScore");
let winMessage = document.querySelector("#winMessage");

if(score < 80){
   totalScore.textContent = `Total Score: ${score}`;
   totalScore.classList.remove("text-info")
   totalScore.classList.add("text-danger")
}else {
    totalScore.textContent = `Total Score: ${score}`;
    totalScore.classList.remove("text-info")
    totalScore.classList.add("text-success")
    winMessage.textContent = "Fantastic work!"
    winMessage.classList.add("text-success")

}

  attempts++;
  document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
  localStorage.setItem("total_attempts", attempts);
}

//Entry Validation (this only works for question one, perhaps an "i in range of" is in order?)
function isFormValid() {
  let isValid = true;
  let q1Response = document.querySelector("#q1").value;
  let validationFdbk = document.querySelector("#validationFdbk");

  if (q1Response === "") {
    isValid = false;
    validationFdbk.textContent = "Question 1 was not answered";
  }

  return isValid;
}