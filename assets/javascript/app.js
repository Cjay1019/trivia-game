$(document).ready(function() {
  var triviaContent = [
    {
      question: "q1fillerq",
      answers: ["q1fillera1", "q1fillera2", "q1fillera3", "q1fillera4"],
      status: "unused"
    },
    {
      question: "q2fillerq",
      answers: ["q2fillera1", "q2fillera2", "q2fillera3", "q2fillera4"],
      status: "unused"
    },
    {
      question: "q3fillerq",
      answers: ["q3fillera1", "q3fillera2", "q3fillera3", "q3fillera4"],
      status: "unused"
    },
    {
      question: "q4fillerq",
      answers: ["q4fillera1", "q4fillera2", "q4fillera3", "q4fillera4"],
      status: "unused"
    }
  ];

  var currentQuestion = -1;

  $("#start-btn").on("click", function() {
    questionChooser();
  });

  function questionChooser() {
    var remainingQuestions = [];
    for (i = 0; i < triviaContent.length; i++) {
      if (triviaContent[i].status === "unused") {
        remainingQuestions.push(i);
      }
    }
    var randomQuestion =
      remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    currentQuestion = randomQuestion;
    triviaContent[randomQuestion].status = "used";
    $("#question-section").html(
      "<h2>" + triviaContent[randomQuestion].question + "</h2>"
    );
  }

  function answerChooser(x) {
    var questionsDisplayed = [];
    for (i = 0; i < triviaContent[x].answers.length; i++) {
      if (questionsDisplayed.includes(triviaContent[x].answers[i]) == false) {
        questionsDisplayed.push(triviaContent[x].answers[i]);
      }
    }
    var randomAnswer =
      questionsDisplayed[Math.floor(Math.random() * questionsDisplayed.length)];
    // $("#answers-section").append();
  }
});
