let score1 = 0;
let score2 = 0;

let ropePosition = 0;
let timeLeft = 30;

let timerInterval;
let gameOver = true;


// ===============================
// TEAM 1 QUESTIONS
// ===============================

const questions1 = [
    {
        question: "Which device is used to type?",
        correct: "Keyboard",
        options: ["Keyboard", "Monitor"]
    },
    {
        question: "Which of these is an input device?",
        correct: "Mouse",
        options: ["Mouse", "Speaker"]
    },
    {
        question: "Which device is used to print documents?",
        correct: "Printer",
        options: ["Printer", "Scanner"]
    },
    {
        question: "Which device shows information?",
        correct: "Monitor",
        options: ["Monitor", "Keyboard"]
    },
    {
        question: "Which device is used to scan pictures?",
        correct: "Scanner",
        options: ["Scanner", "Speaker"]
    }
];


// ===============================
// TEAM 2 QUESTIONS
// ===============================

const questions2 = [
    {
        question: "Which device displays information?",
        correct: "Monitor",
        options: ["Monitor", "Keyboard"]
    },
    {
        question: "Which device is used to move the cursor?",
        correct: "Mouse",
        options: ["Mouse", "Printer"]
    },
    {
        question: "Which device produces sound?",
        correct: "Speaker",
        options: ["Speaker", "Mouse"]
    },
    {
        question: "Which of these is an output device?",
        correct: "Printer",
        options: ["Printer", "Keyboard"]
    },
    {
        question: "Which device is used to enter data?",
        correct: "Keyboard",
        options: ["Keyboard", "Monitor"]
    }
];


let questionIndex1 = 0;
let questionIndex2 = 0;


// ===============================
// START GAME
// ===============================

function startGame() {

    clearInterval(timerInterval);

    score1 = 0;
    score2 = 0;

    ropePosition = 0;
    timeLeft = 30;

    questionIndex1 = 0;
    questionIndex2 = 0;

    gameOver = false;


    document.getElementById("score1").innerText = "0";
    document.getElementById("score2").innerText = "0";

    document.getElementById("timer").innerText =
        "⏱️ Time: 30";


    // Move students + rope back to center
    document.getElementById("tugGame").style.transform =
        "translateX(0px)";


    loadQuestion(1);
    loadQuestion(2);


    document.getElementById("startBtn").disabled = true;


    // START TIMER
    timerInterval = setInterval(function () {

        timeLeft--;

        document.getElementById("timer").innerText =
            "⏱️ Time: " + timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            gameOver = true;

            document.getElementById("startBtn").disabled = false;

            showWinner();
        }

    }, 1000);
}


// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(team, answer) {

    if (gameOver) {
        return;
    }


    // TEAM 1

    if (team === 1) {

        let currentQuestion =
            questions1[questionIndex1];

        if (answer === currentQuestion.correct) {

            score1++;

            ropePosition -= 35;
        }

        document.getElementById("score1").innerText =
            score1;

        questionIndex1++;

        if (questionIndex1 >= questions1.length) {
            questionIndex1 = 0;
        }

        loadQuestion(1);
    }


    // TEAM 2

    if (team === 2) {

        let currentQuestion =
            questions2[questionIndex2];

        if (answer === currentQuestion.correct) {

            score2++;

            ropePosition += 35;
        }

        document.getElementById("score2").innerText =
            score2;

        questionIndex2++;

        if (questionIndex2 >= questions2.length) {
            questionIndex2 = 0;
        }

        loadQuestion(2);
    }


    // MOVE EVERYTHING TOGETHER
    document.getElementById("tugGame").style.transform =
        `translateX(${ropePosition}px)`;
}


// ===============================
// LOAD QUESTION
// ===============================

function loadQuestion(team) {

    let boxes =
        document.querySelectorAll(".team-box");


    if (team === 1) {

        let q = questions1[questionIndex1];

        document.getElementById("question1").innerText =
            q.question;

        let buttons =
            boxes[0].querySelectorAll("button");

        buttons[0].innerText = q.options[0];

        buttons[0].onclick = function () {
            checkAnswer(1, q.options[0]);
        };

        buttons[1].innerText = q.options[1];

        buttons[1].onclick = function () {
            checkAnswer(1, q.options[1]);
        };
    }


    if (team === 2) {

        let q = questions2[questionIndex2];

        document.getElementById("question2").innerText =
            q.question;

        let buttons =
            boxes[1].querySelectorAll("button");

        buttons[0].innerText = q.options[0];

        buttons[0].onclick = function () {
            checkAnswer(2, q.options[0]);
        };

        buttons[1].innerText = q.options[1];

        buttons[1].onclick = function () {
            checkAnswer(2, q.options[1]);
        };
    }
}


// ===============================
// WINNER
// ===============================

function showWinner() {

    if (score1 > score2) {

        alert(
            "🏆 TEAM 1 WINS!\n\n" +
            "Team 1: " + score1 +
            "\nTeam 2: " + score2
        );

    } else if (score2 > score1) {

        alert(
            "🏆 TEAM 2 WINS!\n\n" +
            "Team 1: " + score1 +
            "\nTeam 2: " + score2
        );

    } else {

        alert(
            "🤝 DRAW!\n\n" +
            "Team 1: " + score1 +
            "\nTeam 2: " + score2
        );
    }
}


// ===============================
// RESET
// ===============================

function resetGame() {

    clearInterval(timerInterval);

    score1 = 0;
    score2 = 0;

    ropePosition = 0;
    timeLeft = 30;

    questionIndex1 = 0;
    questionIndex2 = 0;

    gameOver = true;

    document.getElementById("score1").innerText = "0";
    document.getElementById("score2").innerText = "0";

    document.getElementById("timer").innerText =
        "⏱️ Time: 30";

    document.getElementById("tugGame").style.transform =
        "translateX(0px)";

    document.getElementById("startBtn").disabled = false;

    loadQuestion(1);
    loadQuestion(2);
}