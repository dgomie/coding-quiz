var timerEl = document.querySelector("#count");
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var containerEl = document.querySelector("#container");


var timeLeft = 60;
var questionNum = 0;
isDone = false;




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
    2: {
      question: "Which of the following is not an dessert?",
      answers: ["Pie", "Cake", "Chocolate", "Lettuce"],
      correctAnswer: "Lettuce",
    },
    3: {
      question: "Which of the following is not an band?",
      answers: ["Arctic Monkeys", "Monkeys", "Bonobos", "Gorillas"],
      correctAnswer: "Bonobos",
    },
};

var qBankLength = Object.keys(questionBank).length;
console.log(`Question bank length: ${qBankLength}`)



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
function quizOver() {
  clearFeedback();
  mainTextEl.textContent = "All Done!"
  pTextEl.textContent = `Your final score is ${timeLeft}`
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
  submitButton.setAttribute('id', "submit-btn");
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
      checkDone();
      if (!isDone) {
        var currentQuestion = questionBank[questionNum]["question"];
        var currentAnswers = questionBank[questionNum]["answers"];
        var currentCorrect = questionBank[questionNum]["correctAnswer"];
      
    

        // change h1 to question
        mainTextEl.textContent = currentQuestion;

        // render answer choices
        for (let index = 0; index < currentAnswers.length; index++) {
          var answer= document.createElement('li');
          answer.classList.add("button");
          answer.textContent = currentAnswers[index];
      
        //  check answer
        answer.addEventListener("click", function(){
          if (questionNum > 0) {
            clearFeedback();
          };

          questionNum++;

          var feedbackPop = document.createElement("p");
          feedbackPop.classList.add("pop");
          containerEl.append(feedbackPop);

          var button = this.textContent;
          console.log(button);

          if (button === currentCorrect) {
              feedbackPop.textContent = "Correct!";
              changeQuestion()
              
          } else {
              feedbackPop.textContent = "Wrong!";
              timeLeft -= 10;
              changeQuestion();
          }
        });
        containerEl.append(answer);
      };
    };

    var buttonsEl = document.querySelectorAll("button");
    for (let index = 0; index < buttonsEl.length; index++) {
        var answer = buttonsEl[index];

    }
   
    
    }

    changeQuestion();
    checkDone();
    
      
  };


function startTimer() {
  var timerInterval = setInterval(function() {
        
    if (isDone && timeLeft > 0) {
      clearInterval(timerInterval);
      timerEl.textContent = timeLeft;
    } else if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timeLeft--;
      quizOver()
      clearInterval(timerInterval);
      timerEl.textContent = timeLeft;

    } 
  }, 1000); 
};


function checkDone() {
  if (questionNum === qBankLength) {
    isDone = true;
    quizOver();
  }
};


  startEl.addEventListener("click", startQuiz);


