var timerEl = document.querySelector("#count")
var buttonEl = document.querySelector(".button")


function countdown() {
    var timeLeft = 5;
    console.log("button clicked");

      var timerInterval = setInterval(function() {
        
        if (timeLeft > 0) {
        console.log(timeLeft)
          timerEl.textContent = timeLeft;
          timeLeft--;
        } else {
        console.log(timeLeft)
          clearInterval(timerInterval);
          timerEl.textContent = timeLeft;
          console.log("Times up!")
        } 
      }, 1000);  
  }

  buttonEl.addEventListener("click", countdown);


