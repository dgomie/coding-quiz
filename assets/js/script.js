var countEl = document.querySelector("#count");
var timerEl = document.querySelector("#timer")
var startEl = document.querySelector("#start");
var pTextEl = document.querySelector("#pText");
var mainTextEl = document.querySelector("#mainText");
var mainContainerEl = document.querySelector("#container");
var viewHighScoresEl = document.querySelector("#highScores");

// countdown timer value
var timeLeft = 75;
// keeps track of current question
var questionNum = 0;
// used to in startimer, checkDone, changeQuestion, and viewHighScores to determine if quiz is over
isDone = false;

/* Quiz questions, answers, and correct answer. 
Array is used in changeQuestion function within the startQuiz function */
var questionBank = [
  {
      question: "Commonly used data types DO NOT include:",
      answers: ["strings", "booleans", "alerts", "numbers"],
      correctAnswer: "alerts",
  },
  {
      question: "The condition in an if / else statement is enclosed with _________.",
      answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
      correctAnswer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _________.",
    answers: ["numbers & strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above",
  },
  {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "Terminal / Bash", "For Loops", "console.log"],
    correctAnswer: "console.log",
  },
];
// returns the number of questions in questionBank
var qBankLength = questionBank.length;


// startQuiz begins the quiz and handles the changing of the quesitons 
function startQuiz() {
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
        answerContainerEl.setAttribute("id", "answerContainer");
        mainContainerEl.append(answerContainerEl);

        // render answer choice buttons
        for (let index = 0; index < currentAnswers.length; index++) {
          var answer= document.createElement('li');
          answer.classList.add("button");
          answer.textContent = currentAnswers[index];
          answerContainerEl.append(answer);

        //  checks if answer is correct and renders the feedback based on the answer
        answer.addEventListener("click", function(){
          if (questionNum > 0) {
            clearFeedback();
          };
          clearQuestion();
          questionNum++;

          // creates feedback container
          var feedbackContainerEl = document.createElement("div");
          feedbackContainerEl.setAttribute("id", "feedbackContainer");
          mainContainerEl.append(feedbackContainerEl);
          // renders horizontal rule divider
          var hrEl = document.createElement("hr");
          feedbackContainerEl.append(hrEl);
          // renders the feedback
          var feedbackPop = document.createElement("p");
          feedbackPop.classList.add("pop");
          feedbackContainerEl.append(feedbackPop);

          // checks the user's answer
          var button = this.textContent;
          // changes the feedback text if the clicked answer equals the correct answer
          if (button === currentCorrect) {
              feedbackPop.textContent = "Correct!";
          } else {
            // renders 'wrong' and subtracts time from the timer
              feedbackPop.textContent = "Wrong!";
              timeLeft -= 10;
          }
          changeQuestion();
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

// Starts the countdown timer 
function startTimer() {
  var timerInterval = setInterval(function() {
    // if no questions remain the clock stops
    if (isDone && timeLeft > 0) {
      clearInterval(timerInterval);
      countEl.textContent = timeLeft;
    } else if (timeLeft > 0) {
      countEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timeLeft--;
      quizOver();
      clearQuestion();
      clearInterval(timerInterval);
      countEl.textContent = timeLeft;

    } 
  }, 1000); 
};

/*Checks if there are any more questions left. 
If no questions remain, function triggers quizOver and changes isDone to true in order to stop  timer*/

function checkDone() {
  if (questionNum === qBankLength) {
    isDone = true;
    quizOver();
  }
};

// removes the current answer elements from the page by removing the answerContainer
function clearQuestion() {
  var answerContainerEl = document.querySelector("#answerContainer");
  mainContainerEl.removeChild(answerContainerEl);
};

// removes the feedback from the page by removing the feedbackContainer
function clearFeedback() {
var feedbackContainerEl = document.querySelector("#feedbackContainer");
mainContainerEl.removeChild(feedbackContainerEl);
};

/*quizOver function clears remaining question and answers and displays the user's final score 
and a input box asking for the user's initials for placement on the leaderboard */

function quizOver() {
mainContainerEl.style.flexDirection = "column";
clearFeedback();

// changing h1 to notify user that qiz is done and displaying user score
mainTextEl.textContent = "All Done!";
pTextEl.textContent = `Your final score is ${timeLeft}`;
pTextEl.setAttribute("style", "display: inline");

// rendering the high score sumbission form
// submit form container
var submitFormContainer = document.createElement("div");
submitFormContainer.classList.add("submitFormContainer");
mainContainerEl.append(submitFormContainer);


// enter initials label
var enterIntial = document.createElement("label");
enterIntial.textContent = "Enter initials:";
enterIntial.setAttribute("id", "enterInitial");
enterIntial.setAttribute("for", "initialInput")

// initials input
var initialInput = document.createElement("input");
initialInput.setAttribute("id", "initialInput");
initialInput.type = "text";

// submit button
var submitButton = document.createElement("div");
submitButton.textContent = "Submit";
submitButton.classList.add("button");
submitButton.setAttribute('id', "submit-btn");
// appending form elements to container
submitFormContainer.append(enterIntial, initialInput, submitButton);

// submitting high score initials when submit button is clicked
submitButton.addEventListener("click", function() {
  // takes the value of the initialInput and removes any excess spaces at the end of the value.
  var initials = initialInput.value.trim();

  // validation to make sure input is not blank or too long.
  if (initials === "") {
    alert("Please enter your initials.");
  } else if (initials.length > 30) {
    alert("Too many characters.\n Please enter a value between 1-30 characters.");
  } else {
    localStorage.setItem(`${initials}`, JSON.stringify(timeLeft));
    viewHighScores();
  }
  

  });
};

// function parses and grabs the user high scores from local storage
function viewHighScores() {
  mainTextEl.textContent = "High Scores";

  /* checks if viewing the high scores from main page link. if using link, removes the main page elements. 
  else it removes elements from the initials submission form*/

  if (!isDone) {
    mainContainerEl.removeChild(startEl);
  } else {
    var submitFormContainer = document.querySelector(".submitFormContainer");
    mainContainerEl.removeChild(submitFormContainer);
  };
  pTextEl.setAttribute("style", "display: none");
  viewHighScoresEl.setAttribute("style", "display: none");
  timerEl.setAttribute("style", "display: none");

  // pulls user/score data from local storage
  var userScores = {};
  for (let i = 0; i < localStorage.length; i++) {
    var user = localStorage.key(i);
    var score = localStorage.getItem(localStorage.key(i));
    userScores[user] = score; 
  }
  // sorts user names by the score value from highest to lowest
  var namesSortedByScore = Object.keys(userScores).sort(function(a,b){return userScores[b]-userScores[a]})

  // creates and renders scorecard for high score list
  for (let index = 0; index < localStorage.length; index++) {
    var sortedUser = namesSortedByScore[index];
    var sortedScore = userScores[sortedUser]
     var scoreCard = document.createElement("li");
        scoreCard.setAttribute("class", "scoreCard");
        scoreCard.textContent = `${sortedUser} - ${sortedScore}`;
        mainContainerEl.append(scoreCard);
    }; 
  
  // high score container that cards and buttons are appended to
  var hsContainerEl = document.createElement("div");
  hsContainerEl.setAttribute("class", "hsContainer");
  mainContainerEl.append(hsContainerEl);

  // Button will go back to main page by refreshing the page
  var goBackButton = document.createElement("div");
  goBackButton.classList.add("button", "hsButton");
  goBackButton.textContent = "Go Back";
  hsContainerEl.append(goBackButton);
  goBackButton.addEventListener("click", function() {
    location.reload();
  });
// Removes the scorecards from the container and clears the local storage using clearHighScores function
  var clearScoresButton = document.createElement("div");
  clearScoresButton.classList.add("button", "hsButton");
  clearScoresButton.textContent = "Clear High Scores";
  hsContainerEl.append(clearScoresButton);
  clearScoresButton.addEventListener("click", clearHighScores);
};


// function for clearing out highscore cards and local storage info
function clearHighScores() {
  for (let index = 0; index < localStorage.length; index++) {
    var scoreCard = document.querySelector("li");
    mainContainerEl.removeChild(scoreCard);
  };
  localStorage.clear();
};

// Event listeners to call the startQuiz function and viewHighScores function
startEl.addEventListener("click", startQuiz);
viewHighScoresEl.addEventListener("click", viewHighScores);