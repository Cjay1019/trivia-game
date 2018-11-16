// CSS
// ADD TIMERS
// ADD REAL TRIVIA
// ADD GIFS

$(document).ready(function() {
  var triviaContent = [
    {
      question: "q1fillerq",
      answers: [
        { answer: "q1fillera1", status: "unused", correct: "true" },
        { answer: "q1fillera2", status: "unused", correct: "false" },
        { answer: "q1fillera3", status: "unused", correct: "false" },
        { answer: "q1fillera4", status: "unused", correct: "false" }
      ],
      status: "unused"
    },
    {
      question: "q2fillerq",
      answers: [
        { answer: "q2fillera1", status: "unused", correct: "true" },
        { answer: "q2fillera2", status: "unused", correct: "false" },
        { answer: "q2fillera3", status: "unused", correct: "false" },
        { answer: "q2fillera4", status: "unused", correct: "false" }
      ],
      status: "unused"
    },
    {
      question: "q3fillerq",
      answers: [
        { answer: "q3fillera1", status: "unused", correct: "true" },
        { answer: "q3fillera2", status: "unused", correct: "false" },
        { answer: "q3fillera3", status: "unused", correct: "false" },
        { answer: "q3fillera4", status: "unused", correct: "false" }
      ],
      status: "unused"
    },
    {
      question: "q4fillerq",
      answers: [
        { answer: "q4fillera1", status: "unused", correct: "true" },
        { answer: "q4fillera2", status: "unused", correct: "false" },
        { answer: "q4fillera3", status: "unused", correct: "false" },
        { answer: "q4fillera4", status: "unused", correct: "false" }
      ],
      status: "unused"
    }
  ];

  var currentQuestion = -1;
  var correctNumber = 0;
  var incorrectNumber = 0;
  var unansweredNumber = 0;

  // CLICK HANDLERS
  $("body").on("click", "#start-btn", function() {
    $("#start-btn").remove();
    answersQuestionPrint();
  });

  $("body").on("click", ".answers", function(e) {
    clearQuestionAnswers();
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
    } else {
      endScreen();
    }
  }

  // PRINTS THE ANSWERS OPTIONS FOR THE CURRENT QUESTION IN RANDOM ORDER
  function answerChooser(x) {
    for (j = 0; j < 4; j++) {
      var remainingAnswers = [];
      if (x > -1) {
        for (i = 0; i < triviaContent[x].answers.length; i++) {
          if (triviaContent[x].answers[i].status === "unused") {
            remainingAnswers.push(i);
          }
        }
        var randomAnswer =
          remainingAnswers[Math.floor(Math.random() * remainingAnswers.length)];
        triviaContent[x].answers[randomAnswer].status = "used";
        var answersH2 = $("<h2>").text(
          triviaContent[x].answers[randomAnswer].answer
        );
        answersH2.attr("class", "answers");
        answersH2.attr("value", triviaContent[x].answers[randomAnswer].correct);
        $("#answers-section").append(answersH2);
      }
    }
  }

  // PRINTS THE CURRENT QUESTION AND RANDOMLY ORDERED ANSWER OPTIONS
  function answersQuestionPrint() {
    questionChooser();
    answerChooser(currentQuestion);
  }

  // CLEARS THE SCREEN OF QUESTIONS AND ANSWERS
  function clearQuestionAnswers() {
    $("#answers-section").html("");
    $("#question-section").html("");
  }

  // PRINTS A MESSAGE SAYING THE PLAYER IS CORRECT
  function correctPrint() {
    var correctH2 = $("<h2>").text("Correct!");
    correctH2.attr("id", "correct-display");
    $("#question-section").html(correctH2);
  }

  // PRINTS A MESSAGE SAYING THE PLAYER IS INCORRECT AND PRINTS THE CORRECT ANSWER
  function incorrectPrint() {
    var incorrectH2 = $("<h2>").text("Incorrect!");
    var rightAnswer = $("<h3>").text(
      "The correct answer was " +
        triviaContent[currentQuestion].answers[0].answer
    );
    incorrectH2.attr("id", "incorrect-display");
    rightAnswer.attr("id", "right-answer");
    $("#question-section").append(incorrectH2);
    $("#answers-section").append(rightAnswer);
  }

  // CLEARS THE SCREEN AND PRINTS THE NEXT QUESTIN AND ANSWERS
  function nextQuestion() {
    setTimeout(function() {
      clearQuestionAnswers();
      answersQuestionPrint();
    }, 500);
  }

  // PRINTS THE END SCREEN CONTAINING SCORES AND RESET BUTTONS
  function endScreen() {
    clearQuestionAnswers();
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

  // RESETS THE GAME
  function reset() {
    clearQuestionAnswers();
    var startBtn = $("<button>").text("Press to Start");
    startBtn.attr("id", "start-btn");
    $("#btn-section").html(startBtn);
    currentQuestion = -1;
    correctNumber = 0;
    incorrectNumber = 0;
    unansweredNumber = 0;
    for (i = 0; i < 4; i++) {
      triviaContent[i].status = "unused";
      for (var key in triviaContent) {
        triviaContent[i].answers[key].status = "unused";
      }
    }
  }
});
