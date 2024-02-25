var timerEl = document.querySelector("#count");
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var containerEl = document.getElementById("container");

var questionBank = {
    0: {
        question: "Which of the following is not a fruit?",
        answers: ["Apple", "Banana", "Orange", "Pizza"],
        correctAnswer: "Pizza",
    },
    1: {
        question: "Which of the following is not an bird?",
        answers: ["Husky", "Albatross", "Eagle", "Falcon"],
        correctAnswer: "Husky",
    },
}

// get individual question keys from "question" object
console.log(questionBank[0]["question"]);
// get answer 
console.log(questionBank[0]["answers"][1]);


function changeQuestion() {
    var questionNum = 0;
    var currentQuestion = questionBank[questionNum]["question"];
    var currentAnswers = questionBank[questionNum]["answers"];
    var currentCorrect = questionBank[questionNum]["correctAnswer"];

    var answerList = document.createElement("ol");
    containerEl.append(answerList);
   

    // change h1 to question
    mainTextEl.textContent = currentQuestion;

    // print out answer choices
    for (let index = 0; index < currentAnswers.length; index++) {
      var answer = document.createElement('li');
      answer.classList.add("button");
      answer.textContent = currentAnswers[index];
        containerEl.append(answer);
    }
}

function clearQuestion() {
    for (let index = 0; index < currentAnswers.length; index++) {
        var answer = document.createElement('li');
        answer.classList.add("button");
        answer.textContent = currentAnswers[index];
          containerEl.append(answer);
      }
}

function gameOver(score) {
    mainTextEl.textContent = "All Done!"
    pTextEl.textContent = `Your final score is ${score}`
    pTextEl.setAttribute("style", "display: inline")
    var answerButtons = document.querySelectorAll("li");
    for (let index = 0; index < answerButtons.length; index++) {
        const button = answerButtons[index];
        containerEl.removeChild(button)
    }
    
    var enterIntial = document.createElement("p");
    enterIntial.textContent = "Enter initials: ";
    enterIntial.setAttribute("style", "display: inline")

    var initialInput = document.createElement("input");
    initialInput.setAttribute("style", "display: inline")

    submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("style", "display: inline")

    containerEl.append(enterIntial, initialInput, submitButton);
    // var containerEl = document.getElementById("container");


}


function startQuiz() {
    var timeLeft = 3;
    var score = 0;
    console.log("button clicked");
    // clear start text and replace with question text
    startEl.setAttribute("style", "display: none");
    pTextEl.setAttribute("style", "display: none");
    
    changeQuestion();

    

    // timer function
      var timerInterval = setInterval(function() {
        
        if (timeLeft > 0) {
        console.log(timeLeft);
          timerEl.textContent = timeLeft;
          timeLeft--;
        } else {
        console.log(timeLeft);
          clearInterval(timerInterval);
          timerEl.textContent = timeLeft;
          gameOver(score);
        } 
      }, 1000); 
      
  }

  startEl.addEventListener("click", startQuiz);


