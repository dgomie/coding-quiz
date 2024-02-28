var timerEl = document.querySelector("#count");
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var containerEl = document.querySelector("#container");


var timeLeft = 3;
var score = 0;
var questionNum = 0;


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


function clearQuestion() {
    var answerButtons = document.querySelectorAll("li");
    for (let index = 0; index < answerButtons.length; index++) {
        const button = answerButtons[index];
        containerEl.removeChild(button)
    }
};

function clearFeedback() {
  var feedbackPop = document.querySelector(".pop");
  containerEl.removeChild(feedbackPop);
};
// gameOver function clears remaining question and answers and displays the user's final score and a input box asking for the user's initials for placement on the leaderboard
function gameOver() {
  clearFeedback();
  mainTextEl.textContent = "All Done!"
  pTextEl.textContent = `Your final score is ${score}`
  pTextEl.setAttribute("style", "display: inline")
  var answerButtons = document.querySelectorAll("li");
  for (let index = 0; index < answerButtons.length; index++) {
      const button = answerButtons[index];
      containerEl.removeChild(button)
  };
    
  var enterIntial = document.createElement("p");
  enterIntial.textContent = "Enter initials: ";
  enterIntial.setAttribute("style", "display: block");

  var initialInput = document.createElement("input");
  initialInput.setAttribute("style", "display: block");

  submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.setAttribute("style", "display: block");

  containerEl.append(enterIntial, initialInput, submitButton);

}


function startQuiz() {
    console.log("start button clicked");
    // clear start text and replace with question text
    containerEl.removeChild(startEl);
    pTextEl.setAttribute("style", "display: none");
    startTimer();
    
   
   // changeQuestion currently uses questionNum to pull the corresponding object from the question bank. Need to figure out when/where to add to the questionNum. 
function changeQuestion() {
    clearQuestion();
    var currentQuestion = questionBank[questionNum]["question"];
    var currentAnswers = questionBank[questionNum]["answers"];
    var currentCorrect = questionBank[questionNum]["correctAnswer"];
   

    // change h1 to question
    mainTextEl.textContent = currentQuestion;

    // print out answer choices
    for (let index = 0; index < currentAnswers.length; index++) {
      var answer= document.createElement('li');
      answer.classList.add("button");
      answer.textContent = currentAnswers[index];
     
    //  check answer
      answer.addEventListener("click", function(){
        if (questionNum > 0) {
          clearFeedback();
        };

        var feedbackPop = document.createElement("p");
        feedbackPop.classList.add("pop");
        containerEl.append(feedbackPop);

        var button = this.textContent;
        console.log(button);

        if (button === currentCorrect) {
            feedbackPop.textContent = "Correct!";
            questionNum++;
            changeQuestion()
            
        } else {
            feedbackPop.textContent = "Wrong!";
            questionNum++;
            // timeLeft -= 10;
            changeQuestion();
        }
      });
      containerEl.append(answer);
    };

    var buttonsEl = document.querySelectorAll("button");
    for (let index = 0; index < buttonsEl.length; index++) {
        var answer = buttonsEl[index];
        console.log(answer);
    }
   
    
    }

    changeQuestion();
    checkWin();
    
      
  };


function startTimer() {
  var timerInterval = setInterval(function() {
        
    if (timeLeft > 0) {
      console.log(timeLeft);
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      gameOver()
      console.log(timeLeft);
      clearInterval(timerInterval);
      timerEl.textContent = timeLeft;

    } 
  }, 1000); 
};


function checkWin() {
  if (questionNum > questionBank.length) {
    gameOver();
  }
};


  startEl.addEventListener("click", startQuiz);


