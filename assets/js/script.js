var timerEl = document.querySelector("#count");
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var containerEl = document.querySelector("#container");

var timeLeft = 60;
var questionNum = 0;
isDone = false;



console.log(`Local storage items ${localStorage.length}`)
// parsing and grabbing the user high scores from local storage
for (let index = 1; index <= localStorage.length; index++) {
  const element = JSON.parse(localStorage.getItem("user" + [index]));

  console.log(element)
  console.log(element.userInitials + element.userScore)
  console.log(element.userScore)
  
}


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

  // changing h1 to notify user that qiz is done and displaying user score
  mainTextEl.textContent = "All Done!"
  pTextEl.textContent = `Your final score is ${timeLeft}`
  pTextEl.setAttribute("style", "display: inline")

  // clearing the multiple choice answers
  var answerButtons = document.querySelectorAll("li");
  for (let index = 0; index < answerButtons.length; index++) {
      const button = answerButtons[index];
      containerEl.removeChild(button)
  };
  
  // rendering the high score sumbission form
  var enterIntial = document.createElement("p");
  enterIntial.textContent = "Enter initials: ";
  enterIntial.setAttribute("style", "display: block");

  var initialInput = document.createElement("input");
  initialInput.setAttribute("id", "initialInput", "style", "display: block");

  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.setAttribute('id', "submit-btn");
  submitButton.setAttribute("style", "display: block");

  containerEl.append(enterIntial, initialInput, submitButton);

  // submitting high score initials 
  
  submitButton.addEventListener("click", function() {
    var initials = initialInput.value.trim();
    if (initials === "") {
      alert("Please enter a value");
    } else {
      var userScore = {
          userInitials: initials,
          userScore: timeLeft,
        };
        
      };
      // check if there's already high scores in local storage. If no scores, create new userScore object
      if (localStorage.length === 0){
        localStorage.setItem("user" + 1, JSON.stringify(userScore));
      } else {
        var numHighScores = localStorage.length +1;
        localStorage.setItem("user" + numHighScores, JSON.stringify(userScore));
      };
      
  });
 

};


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





