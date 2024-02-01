const easyQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High-level Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlink and Text Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question:
      'Which programming language is known as the "language of the web"?',
    options: ["JavaScript", "Java", "Python", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Counter Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: 'What is the purpose of the JavaScript function "parseInt()"?',
    options: [
      "Parsing a string to an integer",
      "Converting a float to an integer",
      "Converting a string to a float",
      "Parsing a boolean to an integer",
    ],
    correctAnswer: "Parsing a string to an integer",
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "#", "/*", "--"],
    correctAnswer: "//",
  },
];

const mediumQuestions = [
  {
    question: "What is the purpose of AJAX in web development?",
    options: [
      "Asynchronous JavaScript and XML",
      "Advanced JavaScript and XML",
      "Asynchronous JavaScript and XHTML",
      "Advanced JavaScript and XHTML",
    ],
    correctAnswer: "Asynchronous JavaScript and XML",
  },
  {
    question: "What does API stand for in the context of web development?",
    options: [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Application Protocol Interface",
      "Advanced Protocol Interface",
    ],
    correctAnswer: "Application Programming Interface",
  },
  {
    question: 'What is the purpose of the CSS property "z-index"?',
    options: [
      "Setting the background color",
      "Specifying the order of stacking elements",
      "Defining the font size",
      "Controlling the transparency",
    ],
    correctAnswer: "Specifying the order of stacking elements",
  },
  {
    question: "Which HTML tag is used for creating a hyperlink?",
    options: ["<a>", "<link>", "<hlink>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    question:
      'What is the purpose of the JavaScript method "addEventListener()"?',
    options: [
      "Adding a new element to the DOM",
      "Attaching an event handler to an element",
      "Creating an animation",
      "Executing an AJAX request",
    ],
    correctAnswer: "Attaching an event handler to an element",
  },
];

const hardQuestions = [
  {
    question: "What is a closure in JavaScript?",
    options: [
      "A data structure",
      "A design pattern",
      "A function that has access to outer variables",
      "A type of loop",
    ],
    correctAnswer: "A function that has access to outer variables",
  },
  {
    question: "What is the purpose of the HTTP status code 404?",
    options: ["OK", "Not Found", "Internal Server Error", "Unauthorized"],
    correctAnswer: "Not Found",
  },
  {
    question:
      'What does the term "callback hell" refer to in asynchronous JavaScript?',
    options: [
      "A syntax error",
      "Nested and complex callback functions",
      "A type of loop",
      "A coding convention",
    ],
    correctAnswer: "Nested and complex callback functions",
  },
  {
    question: 'What is the purpose of the CSS pseudo-class ":nth-child()"?',
    options: [
      "Styling the first child of an element",
      "Selecting elements based on their position in a parent",
      "Applying styles to odd or even elements",
      "Targeting the last child of an element",
    ],
    correctAnswer: "Selecting elements based on their position in a parent",
  },
  {
    question:
      'In JavaScript, what is the purpose of the "try", "catch", and "finally" blocks in exception handling?',
    options: [
      "To define a function",
      "To create a loop",
      "To handle errors",
      "To execute code asynchronously",
    ],
    correctAnswer: "To handle errors",
  },
];

let gameLevel = "";
let questions= [];

function selectDifficulty(level) {
  const levels = document.getElementsByClassName("difficulty-button");
  levels[0].style.backgroundColor = "white";
  levels[1].style.backgroundColor = "white";
  levels[2].style.backgroundColor = "white";
  gameLevel = level;
  document.getElementById(level).style.backgroundColor = "#61f3cc";
}

let box1 = document.getElementById("quiz-container1");
let box2 = document.getElementById("quiz-container2");
let box3 = document.getElementById("quiz-container3");
let question = document.getElementById("question");
let finalScore = document.getElementById("final-score");
let timeDisplay = document.getElementById("time");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let quesNum = 0;
let score = 0;
let time = 0;

function startQuiz() {
    if (!gameLevel) {
        alert("Please select a game level first");
        return;
    }
    quesNum = 0;
  box1.style.display = "none";
  box2.style.display = "flex";
    
    if (gameLevel == "easy") {
        questions = easyQuestions;
        time = 59;
    } else if (gameLevel == "medium") {
        questions = mediumQuestions;
        time = 49;
    } else if (gameLevel == "hard") {
        questions = hardQuestions;
        time = 29;
    }
    next();
}
let interval;

function next() {
    
    let qtime = time;
    if (quesNum) {
        let prevAns = document.querySelector("input[name='options']:checked")
        console.log(prevAns);
        if (!prevAns) {

            alert("Please select your answer!");
            return;
        }
        clearInterval(interval);
        console.log(prevAns, questions[quesNum - 1].correctAnswer);
        prevAns= prevAns.nextElementSibling.innerText;
        if (prevAns == questions[quesNum - 1].correctAnswer) {
            score+=10;
            console.log(score);
        }
        finalScore.innerText = `${score}/50`;
    }
    if (quesNum >= 5) {
      box3.style.display = "flex";
        box2.style.display = "none";
        return;
    }
    interval = setInterval(() => {
        if (qtime == -1) {
            
            clearInterval(interval);
            next();
        }
        timeDisplay.innerText = qtime;
        qtime--;
    }, 1000);
    
    question.innerText = questions[quesNum].question;
    scoreDisplay.innerText = `Score:${score}/50`;
    // timeDisplay.innerText= `Time left: 00:${time}`
    option1.innerText = questions[quesNum].options[0];
    option2.innerText = questions[quesNum].options[1];
    option3.innerText = questions[quesNum].options[2];
    option4.innerText = questions[quesNum].options[3];
    quesNum++;
}

function playAgain() {
    clearInterval(interval);
    box1.style.display = "flex";
    box3.style.display = "none";
    score = 0;
    gameLevel = "";
    questions = [];
    const levels = document.getElementsByClassName("difficulty-button");
    levels[0].style.backgroundColor = "white";
    levels[1].style.backgroundColor = "white";
    levels[2].style.backgroundColor = "white";
}

function exit() {
    clearInterval(interval);
    box1.style.display = "flex";
    box2.style.display = "none";
    score = 0;
    gameLevel = "";
    questions = [];
    const levels = document.getElementsByClassName("difficulty-button");
    levels[0].style.backgroundColor = "white";
    levels[1].style.backgroundColor = "white";
    levels[2].style.backgroundColor = "white";
}
