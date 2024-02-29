var countEl = document.querySelector("#count");
var timerEl = document.querySelector("#timer")
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var mainContainerEl = document.querySelector("#container");
var viewHighScoresEl = document.querySelector("#highScores");
var timeLeft = 60;
var questionNum = 0;
isDone = false;

// parsing and grabbing the user high scores from local storage
function viewHighScores() {
  mainTextEl.textContent = "High Scores";

  if (!isDone) {
    mainContainerEl.removeChild(startEl);
  } else {
    var submitFormContainer = document.querySelector(".submitFormContainer")
    mainContainerEl.removeChild(submitFormContainer)
  };
  pTextEl.setAttribute("style", "display: none");
  viewHighScoresEl.setAttribute("style", "display: none");
  timerEl.setAttribute("style", "display: none");

  

  for (let index = 1; index <= localStorage.length; index++) {
    const element = JSON.parse(localStorage.getItem("user" + [index]));

    console.log(element)
    console.log(element.userInitials + element.userScore)
    console.log(element.userScore)

    var scoreCard = document.createElement("li");
    scoreCard.setAttribute("class", "scoreCard");
    scoreCard.textContent = `${element.userInitials} - ${element.userScore}`;
    mainContainerEl.append(scoreCard);
  };

  var hsContainerEl = document.createElement("div");
  hsContainerEl.setAttribute("class", "hsContainer");
  mainContainerEl.append(hsContainerEl);

  var goBackButton = document.createElement("div");
  goBackButton.classList.add("button", "hsButton");
  goBackButton.textContent = "Go Back";
  hsContainerEl.append(goBackButton);
  goBackButton.addEventListener("click", function() {
    location.reload();
  })

  var clearScoresButton = document.createElement("div");
  clearScoresButton.classList.add("button", "hsButton");
  clearScoresButton.textContent = "Clear High Scores";
  hsContainerEl.append(clearScoresButton);
  clearScoresButton.addEventListener("click", clearHighScores)

};
// clearing out highscore cards and local storage info
function clearHighScores() {

  for (let index = 0; index < localStorage.length; index++) {
    var scoreCard = document.querySelector("li");
    mainContainerEl.removeChild(scoreCard)
  }
  localStorage.clear();

};



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

function clearQuestion() {
    var answerContainerEl = document.querySelector("#answerContainer");
    mainContainerEl.removeChild(answerContainerEl)
   
    // var answerButtons = document.querySelectorAll("li");
    // for (let index = 0; index < answerButtons.length; index++) {
    //     const button = answerButtons[index];
    //     answerContainerEl.removeChild(button)
    // }
    
};

function clearFeedback() {
  // var feedbackPop = document.querySelector(".pop");
  var feedbackContainerEl = document.querySelector("#feedbackContainer")
  mainContainerEl.removeChild(feedbackContainerEl);
};

/*gameOver function clears remaining question and answers and displays the user's final score 
and a input box asking for the user's initials for placement on the leaderboard */

function quizOver() {
  mainContainerEl.style.flexDirection = "column";
  clearFeedback();

  // changing h1 to notify user that qiz is done and displaying user score
  mainTextEl.textContent = "All Done!";
  pTextEl.textContent = `Your final score is ${timeLeft}`;
  pTextEl.setAttribute("style", "display: inline");
  
  // rendering the high score sumbission form
  var submitFormContainer = document.createElement("div");
  submitFormContainer.classList.add("submitFormContainer")
  mainContainerEl.append(submitFormContainer);
  console.log("submit form container")

  var enterIntial = document.createElement("label");
  enterIntial.textContent = "Enter initials: ";
  enterIntial.setAttribute("id", "enterInitial");

  var initialInput = document.createElement("input");
  initialInput.setAttribute("id", "initialInput");
  initialInput.type = "text";
  initialInput.autofocus;

  var submitButton = document.createElement("div");
  submitButton.textContent = "Submit";
  submitButton.classList.add("button")
  submitButton.setAttribute('id', "submit-btn");
  

  submitFormContainer.append(enterIntial, initialInput, submitButton);

  // submitting high score initials 
  
  submitButton.addEventListener("click", function() {
    var initials = initialInput.value.trim();
    if (initials === "") {
      alert("Please enter your initials");
    } else {
      var userScore = {
          userInitials: initials,
          userScore: timeLeft,
        };
        
      
      // check if there's already high scores in local storage. If no scores, create new userScore object
      if (localStorage.length === 0){
        localStorage.setItem("user" + 1, JSON.stringify(userScore));
      } else {
        var numHighScores = localStorage.length +1;
        localStorage.setItem("user" + numHighScores, JSON.stringify(userScore));
      };
      viewHighScores();
    };
  
  });
 

};


function startQuiz() {
    console.log("start button clicked");
    // clear start text and replace with question text
    mainContainerEl.removeChild(startEl);
    pTextEl.setAttribute("style", "display: none");
    viewHighScoresEl.setAttribute("style", "display: none");
    mainContainerEl.style.flexDirection = "column-reverse";
    startTimer();

    
   
   // changeQuestion currently uses questionNum to pull the corresponding object from the question bank.  
  function changeQuestion() {
      checkDone();
      if (!isDone) {
        var currentQuestion = questionBank[questionNum]["question"];
        var currentAnswers = questionBank[questionNum]["answers"];
        var currentCorrect = questionBank[questionNum]["correctAnswer"];

        // change h1 to question
        mainTextEl.textContent = currentQuestion;

        var answerContainerEl = document.createElement("div");
        answerContainerEl.setAttribute("id", "answerContainer")
        mainContainerEl.append(answerContainerEl)

        // render answer choices
        for (let index = 0; index < currentAnswers.length; index++) {
          var answer= document.createElement('li');
          answer.classList.add("button");
          answer.textContent = currentAnswers[index];
          answerContainerEl.append(answer);

        //  check answer
        answer.addEventListener("click", function(){
          if (questionNum > 0) {
            clearFeedback();
          };
          clearQuestion();
          questionNum++;



          var feedbackContainerEl = document.createElement("div");
          feedbackContainerEl.setAttribute("id", "feedbackContainer")
          mainContainerEl.append(feedbackContainerEl);

          var hrEl = document.createElement("hr");
          feedbackContainerEl.append(hrEl);

          var feedbackPop = document.createElement("p");
          feedbackPop.classList.add("pop");
          feedbackContainerEl.append(feedbackPop);

          var button = this.textContent;
          console.log(button);

          if (button === currentCorrect) {
              feedbackPop.textContent = "Correct!";
          } else {
              feedbackPop.textContent = "Wrong!";
              timeLeft -= 10;
          }
          changeQuestion()
        });
      };
    };

    var buttonsEl = document.querySelectorAll("button");
    for (let index = 0; index < buttonsEl.length; index++) {
        var answer = buttonsEl[index];
    }};

    changeQuestion();
    checkDone();   
  };


function startTimer() {
  var timerInterval = setInterval(function() {
        
    if (isDone && timeLeft > 0) {
      clearInterval(timerInterval);
      countEl.textContent = timeLeft;
    } else if (timeLeft > 0) {
      countEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timeLeft--;
      quizOver()
      clearQuestion();
      clearInterval(timerInterval);
      countEl.textContent = timeLeft;

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
viewHighScoresEl.addEventListener("click", viewHighScores)




