// CSS
// ADD MORE QUESTIONS/GIFS

$(document).ready(function() {
  var triviaContent = [
    {
      question:
        "Who was the doctor that transformed Steve Rogers into Captain America?",
      answers: [
        { answer: "Dr. Erskine", status: "unused", correct: "true" },
        { answer: "Dr. Levy", status: "unused", correct: "false" },
        { answer: "Dr. Whitehall", status: "unused", correct: "false" },
        { answer: "Dr. List", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/cap.gif"
    },
    {
      question: "What is Captain America's shield made out of?",
      answers: [
        { answer: "Vibranium", status: "unused", correct: "true" },
        { answer: "Adamantium", status: "unused", correct: "false" },
        { answer: "Carbonadium", status: "unused", correct: "false" },
        { answer: "Osmium", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/shield.gif"
    },
    {
      question: "What caused Bruce Banners heroic change into the Hulk?",
      answers: [
        { answer: "Gamma Radiation", status: "unused", correct: "true" },
        { answer: "Cosmic Radiation", status: "unused", correct: "false" },
        { answer: "Vita Radiation", status: "unused", correct: "false" },
        { answer: "Beta Radiation", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/hulk.gif"
    },
    {
      question: "What is the name of Star Lords' Ship?",
      answers: [
        { answer: "The Milano", status: "unused", correct: "true" },
        { answer: "The Commodore", status: "unused", correct: "false" },
        { answer: "The Dark Aster", status: "unused", correct: "false" },
        { answer: "The Eclector", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/starlord.gif"
    },
    {
      question: "What Level agent in S.H.I.E.L.D. is Phil Coulson?",
      answers: [
        { answer: "Level 8", status: "unused", correct: "true" },
        { answer: "Level 10", status: "unused", correct: "false" },
        { answer: "Level 1", status: "unused", correct: "false" },
        { answer: "Level 5", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/phil.gif"
    },
    {
      question:
        "What organization was funding Obadiah in his quest to defeat Tony/Iron Man?",
      answers: [
        { answer: "The 10 Rings", status: "unused", correct: "true" },
        { answer: "Hydra", status: "unused", correct: "false" },
        { answer: "AIM", status: "unused", correct: "false" },
        { answer: "HAMMER", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/obadiah.gif"
    },
    {
      question:
        "Which German Doctor was used by the S.S.R. for his intelligence?",
      answers: [
        { answer: "Dr. Arnim Zola", status: "unused", correct: "true" },
        { answer: "Dr. List", status: "unused", correct: "false" },
        { answer: "Dr. Whitehall", status: "unused", correct: "false" },
        { answer: "Osmium", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/arnim.gif"
    },
    {
      question: "How many suits does Tony make before the end of Iron Man 3?",
      answers: [
        { answer: "42", status: "unused", correct: "true" },
        { answer: "24", status: "unused", correct: "false" },
        { answer: "65", status: "unused", correct: "false" },
        { answer: "36", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/ironman.gif"
    }
  ];

  var currentQuestion = -1;
  var correctNumber = 0;
  var incorrectNumber = 0;
  var unansweredNumber = 0;
  var timeRemaining = 15;
  var intervalId;

  // CLICK HANDLERS
  $("body").on("click", "#start-btn", function() {
    $("#start-btn").remove();
    answersQuestionPrint();
  });

  $("body").on("click", ".answers", function(e) {
    clearScreen();
    var valueString = e.currentTarget.getAttribute("value");
    if (valueString === "true") {
      correctNumber++;
      correctPrint();
      nextQuestion();
    } else {
      incorrectNumber++;
      incorrectPrint();
      nextQuestion();
    }
  });

  $("body").on("click", "#reset-btn", function() {
    reset();
  });

  // RANDOMLY CHOOSES AND PRINTS QUESTION, OR ENDSCREEN IF ALL QUESTIONS ARE ANSWERED
  function questionChooser() {
    var remainingQuestions = [];
    for (i = 0; i < triviaContent.length; i++) {
      if (triviaContent[i].status === "unused") {
        remainingQuestions.push(i);
      }
    }
    if (remainingQuestions.length > 0) {
      var randomQuestion =
        remainingQuestions[
          Math.floor(Math.random() * remainingQuestions.length)
        ];
      currentQuestion = randomQuestion;
      triviaContent[randomQuestion].status = "used";
      var questionh3 = $("<h3>").text(triviaContent[randomQuestion].question);
      questionh3.attr("id", "question");
      $("#question-section").append(questionh3);
      printTimer();
    } else {
      endScreen();
    }
  }

  // PRINTS THE ANSWERS OPTIONS FOR THE CURRENT QUESTION IN RANDOM ORDER
  function answerChooser(x) {
    for (j = 0; j < 4; j++) {
      var remainingAnswers = [];
      for (i = 0; i < triviaContent[x].answers.length; i++) {
        if (triviaContent[x].answers[i].status === "unused") {
          remainingAnswers.push(i);
        }
      }
      if (remainingAnswers.length > 0) {
        var randomAnswer =
          remainingAnswers[Math.floor(Math.random() * remainingAnswers.length)];
        triviaContent[x].answers[randomAnswer].status = "used";
        var answersH2 = $("<h2>").text(
          triviaContent[x].answers[randomAnswer].answer
        );
        answersH2.attr("class", "answers");
        answersH2.attr("value", triviaContent[x].answers[randomAnswer].correct);
        $("#answers-section").append(answersH2);
      } else {
        return;
      }
    }
  }

  // PRINTS THE CURRENT QUESTION AND RANDOMLY ORDERED ANSWER OPTIONS
  function answersQuestionPrint() {
    questionChooser();
    answerChooser(currentQuestion);
  }

  // CLEARS THE SCREEN OF QUESTIONS AND ANSWERS
  function clearScreen() {
    $("#answers-section").html("");
    $("#question-section").html("");
    $("#timer-section").html("");
    $("#gif-section").html("");
  }

  // PRINTS A MESSAGE SAYING THE PLAYER IS CORRECT
  function correctPrint() {
    var currentGif = $("<img>");
    currentGif.attr("id", "answer-gif");
    currentGif.attr("src", triviaContent[currentQuestion].gif);
    var correctH2 = $("<h2>").text("Correct!");
    correctH2.attr("id", "correct-display");
    $("#question-section").html(correctH2);
    $("#gif-section").append(currentGif);
  }

  // PRINTS A MESSAGE SAYING THE PLAYER IS INCORRECT AND PRINTS THE CORRECT ANSWER
  function incorrectPrint() {
    var incorrectH2 = $("<h2>").text("Incorrect!");
    var rightAnswer = $("<h3>").text(
      "The correct answer was " +
        triviaContent[currentQuestion].answers[0].answer
    );
    var currentGif = $("<img>");
    currentGif.attr("id", "answer-gif");
    currentGif.attr("src", triviaContent[currentQuestion].gif);
    incorrectH2.attr("id", "incorrect-display");
    rightAnswer.attr("id", "right-answer");
    $("#question-section").append(incorrectH2);
    $("#answers-section").append(rightAnswer);
    $("#gif-section").append(currentGif);
  }

  // PRINTS A MESSAGE SAYING OUT OF TIME AND PRINTS CORRECT ANSWER AND GOES TO NEXT QUESTION
  function timesUpPrint() {
    var currentGif = $("<img>");
    currentGif.attr("id", "answer-gif");
    currentGif.attr("src", triviaContent[currentQuestion].gif);
    var timesUp = $("<h2>").text("Times Up!");
    var rightAnswer = $("<h3>").text(
      "The correct answer was " +
        triviaContent[currentQuestion].answers[0].answer
    );
    timesUp.attr("id", "times-up");
    rightAnswer.attr("id", "right-answer");
    $("#question-section").append(timesUp);
    $("#answers-section").append(rightAnswer);
    $("#gif-section").append(currentGif);
  }

  // CLEARS THE SCREEN AND PRINTS THE NEXT QUESTIN AND ANSWERS
  function nextQuestion() {
    resetTime();
    setTimeout(function() {
      clearScreen();
      answersQuestionPrint();
    }, 3000);
  }

  // PRINTS THE END SCREEN CONTAINING SCORES AND RESET BUTTONS
  function endScreen() {
    clearScreen();
    var allDone = $("<h2>").text("All done, here's how you did!");
    var correct = $("<h3>").text("Correct Answers: " + correctNumber);
    var incorrect = $("<h3>").text("Incorrect Answers: " + incorrectNumber);
    var unanswered = $("<h3>").text("Unanswered: " + unansweredNumber);
    var resetBtn = $("<button>").text("Play Again!");
    allDone.attr("id", "all-done");
    correct.attr("id", "correct-number");
    incorrect.attr("id", "incorrect-number");
    unanswered.attr("id", "unanswered-number");
    resetBtn.attr("id", "reset-btn");
    $("#question-section").append(allDone);
    $("#answers-section").append(correct, incorrect, unanswered);
    $("#btn-section").append(resetBtn);
  }

  // DECREMENTS THE TIMER AND PRINTS REMAINING TIME
  function count() {
    if (timeRemaining > 0) {
      timeRemaining--;
      $("#time-display").text("Time Remaining: " + timeRemaining + " Seconds");
    } else {
      unansweredNumber++;
      clearInterval(intervalId);
      clearScreen();
      timesUpPrint();
      nextQuestion();
    }
  }

  // RESETS THE TIMER
  function resetTime() {
    timeRemaining = 15;
    clearInterval(intervalId);
  }

  // PRINTS THE TIMER AND STARTS COUNTDOWN
  function printTimer() {
    var timeDisplay = $("<h3>").text(
      "Time Remaining: " + timeRemaining + " Seconds"
    );
    timeDisplay.attr("id", "time-display");
    $("#timer-section").append(timeDisplay);
    intervalId = setInterval(count, 1000);
  }

  // RESETS THE GAME
  function reset() {
    clearScreen();
    var startBtn = $("<button>").text("Press to Start");
    startBtn.attr("id", "start-btn");
    $("#btn-section").html(startBtn);
    currentQuestion = -1;
    correctNumber = 0;
    incorrectNumber = 0;
    unansweredNumber = 0;
    for (i = 0; i < triviaContent.length; i++) {
      triviaContent[i].status = "unused";
      for (var key in triviaContent) {
        triviaContent[i].answers[key].status = "unused";
      }
    }
  }

  // ENABLES PRESSING ENTER FOR START AND RESET
  $(document).keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      $("#start-btn").click();
      $("#reset-btn").click();
      return false;
    }
  });
});
