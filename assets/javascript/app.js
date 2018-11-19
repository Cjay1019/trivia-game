// CREATE README

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
    },
    {
      question: "What number is on the side of the Helicarrier?",
      answers: [
        { answer: "64", status: "unused", correct: "true" },
        { answer: "24", status: "unused", correct: "false" },
        { answer: "42", status: "unused", correct: "false" },
        { answer: "36", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/helicarrier.gif"
    },
    {
      question: "What year did Captain America come out of his icy coma?",
      answers: [
        { answer: "2011", status: "unused", correct: "true" },
        { answer: "2013", status: "unused", correct: "false" },
        { answer: "2017", status: "unused", correct: "false" },
        { answer: "2007", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/coma.gif"
    },
    {
      question: "In which MCU film did Thanos first appear?",
      answers: [
        { answer: "The Avengers", status: "unused", correct: "true" },
        {
          answer: "The Avengers: Age of Ultron",
          status: "unused",
          correct: "false"
        },
        {
          answer: "The Avengers: Infinity War",
          status: "unused",
          correct: "false"
        },
        {
          answer: "Guardians of the Galaxy",
          status: "unused",
          correct: "false"
        }
      ],
      status: "unused",
      gif: "assets/images/thanos.gif"
    },
    {
      question: "Which of these is NOT the name of an Infinity Stone",
      answers: [
        { answer: "Control Stone", status: "unused", correct: "true" },
        { answer: "Space Stone", status: "unused", correct: "false" },
        { answer: "Power Stone", status: "unused", correct: "false" },
        { answer: "Mind Stone", status: "unused", correct: "false" }
      ],
      status: "unused",
      gif: "assets/images/gauntlet.gif"
    }
  ];

  // GLOBAL VARIABLES
  var currentQuestion = -1;
  var correctNumber = 0;
  var incorrectNumber = 0;
  var unansweredNumber = 0;
  var timeRemaining = 15;
  var intervalId;
  var questionsCompleted = 0;

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
      questionsCompleted++;
      correctPrint();
      nextQuestion();
    } else {
      incorrectNumber++;
      questionsCompleted++;
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
    if (questionsCompleted < 8) {
      var randomQuestion =
        remainingQuestions[
          Math.floor(Math.random() * remainingQuestions.length)
        ];
      currentQuestion = randomQuestion;
      triviaContent[randomQuestion].status = "used";
      var questionh3 = $("<h3>").text(triviaContent[randomQuestion].question);
      questionh3.attr("id", "question");
      questionh3.attr("class", "animated flipInX");
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
        answersH2.attr(
          "class",
          "answers btn btn-outline-primary waves-effect d-block w-25 animated flipInX"
        );
        answersH2.attr("style", "min-width: 200px;");
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
    $("#answers-section").empty();
    $("#question-section").empty();
    $("#timer-section").empty();
    $("#gif-section").empty();
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
    resetBtn.attr("class", "btn btn-light");
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
      questionsCompleted++;
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
    timeDisplay.attr("class", "animated flipInX");
    $("#timer-section").append(timeDisplay);
    intervalId = setInterval(count, 1000);
  }

  // RESETS THE GAME
  function reset() {
    clearScreen();
    var startBtn = $("<button>").text("Press to Start");
    startBtn.attr("id", "start-btn");
    startBtn.attr("class", "btn btn-light");
    $("#btn-section").html(startBtn);
    currentQuestion = -1;
    correctNumber = 0;
    incorrectNumber = 0;
    unansweredNumber = 0;
    questionsCompleted = 0;
    triviaContent.forEach(function(question) {
      question.status = "unused";
      question.answers.forEach(function(answer) {
        answer.status = "unused";
      });
    });
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
