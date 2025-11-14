const questions = [
  // 1. Original Questions
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style System", correct: false },
      { text: "Creative Styling System", correct: false }
    ]
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "2000", correct: false }
    ]
  },

  // 2. New Questions – Each from a different domain

  // 🎮 Topic: Gaming
  {
    question: "In PUBG, what is the maximum number of players in a classic match?",
    answers: [
      { text: "50", correct: false },
      { text: "75", correct: false },
      { text: "100", correct: true },
      { text: "150", correct: false }
    ]
  },

  // 🌐 Topic: Web Development
  {
    question: "Which HTTP status code means 'Not Found'?",
    answers: [
      { text: "200", correct: false },
      { text: "301", correct: false },
      { text: "404", correct: true },
      { text: "500", correct: false }
    ]
  },

  // ⚡ Topic: Electronics
  {
    question: "Which component is used to store electrical charge?",
    answers: [
      { text: "Resistor", correct: false },
      { text: "Diode", correct: false },
      { text: "Transistor", correct: false },
      { text: "Capacitor", correct: true }
    ]
  },

  // 💻 Topic: Computer Science
  {
    question: "Which data structure uses FIFO (First In First Out)?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false }
    ]
  },

  // 🌍 Topic: Geography
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Sahara Desert", correct: false },
      { text: "Gobi Desert", correct: false },
      { text: "Antarctic Desert", correct: true },
      { text: "Arabian Desert", correct: false }
    ]
  }
];

// -----------------------------------------------------

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  nextButton.innerHTML = "Next";
  resultBox.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("answer-btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  userAnswers.push({
    question: questions[currentQuestionIndex].question,
    selected: selectedBtn.innerHTML,
    isCorrect: correct
  });

  if (correct) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  questionElement.innerHTML = "Quiz Completed!";
  resultBox.classList.remove("hide");

  resultBox.innerHTML = `
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <h3>Summary:</h3>
  `;

  userAnswers.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <strong>Q${index + 1}:</strong> ${item.question}<br>
      <strong>Your Answer:</strong> ${item.selected} — 
      ${item.isCorrect ? "<span style='color:#32cd32;'>Correct</span>" : "<span style='color:#ff4d4d;'>Wrong</span>"}
      <br><br>
    `;
    resultBox.appendChild(p);
  });

  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
});

startQuiz();
