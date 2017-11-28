// Specify a function to execute when the DOM is fully loaded.
$(document).ready(function () {

  // calls for start of the game @ new game conditions function
  gameStart();
})

//Set Variables

var currentQuestion;
var numberCorrect;
var numberWrong;
var questionCounter = 0
// congratulatory gifs
var gifArray = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17', 'q18'];
// wrong answer gif
var gifWrongArray = ['wq1'];
// times up gif
var gifTimeUp = ['tq1'];

//Some things the user will read after each question.
var message = {
  // message.correct
  correct: "Correct!",
  // message.incorrect
  incorrect: "Incorrect!",
  // message.time
  time: "Times Up!"
};

//questions and answers
var questions = [{
    // 1
    q: "The Great Red Spot is a gigantic storm located on which planet in our solar system?",
    a: ["A. Uranus", "B. Saturn", "C. Jupiter", "D. Neptune"],
    correct: 2
  },
  {
    // 2
    q: "Which planet is nearest to earth?",
    a: ["A. Mercury", "B. Venus", "C. Mars", "D. Jupiter"],
    correct: 0
  },
  {
    // 3
    q: "What is the orbital period of the moon?",
    a: ["A. 15 days", "B. 27 days", "C. 30 days", "D. 31 days"],
    correct: 1
  },
  {
    // 4
    q: "Who was the first person to reach space?",
    a: ["A. Alan Shepard", "B. Georgi Ivanov", "C. Lance Armstrong", "D. Yuri Gagarin"],
    correct: 3
  },
  {
    // 5
    q: "Earth is located in which galaxy?",
    a: ["A. Andromeda Galaxy", "B. Milky Way Galaxy", "C. Triangulum Galaxy", "D. Whirpool Galaxy"],
    correct: 1
  },
  {
    // 6
    q: "Which is NASA's most famous telescope?",
    a: ["A. Hubble Space Telescope", "B. The future James Webb Space Telescope", "C. The Spitzer Space Telescope", "D. The Fermi Gamma-Ray Space Telescope."],
    correct: 0
  },
  {
    // 7
    q: "Is the planet Neptune bigger than planet Earth?",
    a: ["A. True", "B. False"],
    correct: 0
  },
  {
    // 8
    q: "Which planet is named after the Roman god of war?",
    a: ["A. Saturn", "B. Neptune", "C. Uranus", "D. Mars"],
    correct: 3
  },
  {
    // 9
    q: "Who discovered Uranus?",
    a: ["A. Johannes Kepler", "B. Galileo Galilei", "C.  William Herschel", "D. Charles Messier"],
    correct: 2
  },
  {
    // 10
    q: "What is the hottest planet in our solar system?",
    a: ["A. Mercury", "B. Venus", "C. Mars", "D. Jupiter"],
    correct: 1
  },
  {
    // 11
    q: "What is the farthest human-made object from planet Earth?",
    a: ["A. Pioneer 6", "B. Voyager 1", "C. Pioneer 7", "D. Genesis"],
    correct: 1
  },
  {
    // 12
    q: "Which year was the first exoplanet discovered in?",
    a: ["A. 1985", "B. 1995", "C. 2005", "D. 2015"],
    correct: 1
  },
  {
    // 13
    q: "It will take Voyager 1 40,000 years to pass through another star system?",
    a: ["A. True", "B. False"],
    correct: 0
  },
  {
    // 14
    q: "Which way does the Earth spin?",
    a: ["A. From west to east", "B. From east to west"],
    correct: 0
  },
  {
    // 15
    q: "Jupiter is made up of approximately 90%...",
    a: ["A. Helium", "B. Oxygen", "C. Hydrogen", "D. Methane"],
    correct: 2
  },
  {
    // 16
    q: "How many stars are in the little dipper?",
    a: ["A. 3", "B. 6", "C. 8", "D. 12"],
    correct: 1
  },
  {
    // 17
    q: "When was the U.S. flag first applied to a spacesuit?",
    a: ["A. 1964", "B. 1960", "C. 1959", "D. 1965"],
    correct: 3
  },
  {
    // 18
    q: "Which animals caused a launch delay of the space shuttle Discovery, STS-70 (June 1995)?",
    a: ["A. Gophers", "B. Alligator", "C. Bats", "D. Woodpeckers"],
    correct: 3
  },
];


//New game conditions function
function gameStart() {

  // .empty because these items do not belong at the beggining of the game
  $("#questionArea").empty()
  $("#messageArea").empty()
  $("#answerArea").empty()
  $('#correctedAnswer').empty();

  currentQuestion = 0;
  numberCorrect = 0;
  numberWrong = 0;
  addQuestion();
}

//adds questions & answers to page
var answerSelection

function addQuestion() {

  // no answer at the start of a new question
  $("#answerArea").empty();
  // no gif at the start of a new question
  $('#gif').empty();
  // no answer
  $('#correctedAnswer').empty();
  // shows the questions
  $("#questionArea").html(questions[currentQuestion].q);
  // i < 4 = 4 possible answers
  for (i = 0; i < 4; i++) {
    // use to show answerChoices on div
    var answerChoice = $("<div>")
    // Set the content of each element in the set of matched elements to the specified text.
    // shows current questions, updates to current question using *(questions[currentQuestion].a[i])*
    answerChoice.text(questions[currentQuestion].a[i])
    // Adds the specified class(es) to each element in the set of matched elements.
    // this line lets you press your choice
    answerChoice.addClass("yourChoice")
    // Set one or more attributes for the set of matched elements.
    // specifies right and wrong, if not used they're all wrong
    answerChoice.attr({
      'data-zindex': i
    });
    // inserts content into answerArea div
    $("#answerArea").append(answerChoice)
  }

  timerStart()

  //Set Onclick for answer divs
  $('.yourChoice').on('click', function () {
    answerSelection = $(this).data('zindex');
    clearInterval(timer);
    answer();
  });
}

//timer
var seconds
var timeOut = true;

function timerStart() {
  // how many seconds timer is counting down
  seconds = 20
  timer = setInterval(decrement, 1000);
}

//setting for timer decrease
function decrement() {
  $("#timerArea").html("Time remaining: " + seconds)
  seconds--
  if (seconds < 0) {

    $("#messageArea").html(message.time);
    clearInterval(timer);
    timeOut = false
    answer();
  }
}

//answer display
function answer() {
  // hides choices on answer page
  $('.yourChoice').empty();
  // hides questions on answer page
  $("#questionArea").empty();

  var answerIndex = questions[currentQuestion].correct
  var answerText = questions[currentQuestion].a[questions[currentQuestion].correct];

  //checks to see correct, incorrect, or unanswered
  if ((answerSelection == answerIndex) && (timeOut == true)) {
    // 
    $("#answerArea").html(message.correct)
    // various collections of congratulatory messages
    $('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "275px">');
    // adds to number of correct
    numberCorrect++

  } else if ((answerSelection != answerText) && (timeOut == true)) {
    // 
    $("#answerArea").html(message.incorrect)
    // shows correct answer

    $('#correctedAnswer').html('The correct answer was: ' + answerText);
    // shows donald trump gif
    $('#gif').html('<img src = "assets/images/' + gifWrongArray + '.gif" width = "275px">');
    // adds to number of incorrect
    numberWrong++

  } else {
    // times up message will appear if timer hits 0
    $("#answerArea").html(message.time)
    // shows correct answer
    $('#correctedAnswer').html('The correct answer was: ' + answerText);
    // shows lamelo ball gif
    $('#gif').html('<img src = "assets/images/' + gifTimeUp + '.gif" width = "275px">');
    // adds to number of incorrect
    numberWrong++
    // if changed to false will show as time up no matter what answer
    timeOut = true
  }
  
  currentQuestion++
  questionCounter++
  questionScore()


};

//shows end of game scores
function questionScore() {
  // tells the game when to stop
  if (questionCounter === questions.length) {
    // end of game messages 
    // .html( htmlString ) -- Set the HTML contents of each element in the set of matched elements.
    $("#messageArea").html("Congrats on finishing the quiz! Let's see how you did...")
    $("#questionArea").html("You got " + numberCorrect + " of the questions right, nice!");
    $("#answerArea").html("You got " + numberWrong + " wrong.")
  } else {
    $("#messageArea").empty();
    setTimeout(addQuestion, 2000);
  }

}
