const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "🎮 Gaming: Which game features the character 'Kratos'?",
    answers: [
      { text: "God of War", correct: true },
      { text: "Assassin’s Creed", correct: false },
      { text: "The Witcher", correct: false },
      { text: "Hitman", correct: false }
    ]
  },
  {
    question: "💻 Web Dev: What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Creative Styling System", correct: false },
      { text: "Computer Style Setup", correct: false },
      { text: "Code Styling Sheet", correct: false }
    ]
  },
  {
    question: "🔌 Electronics: Which component stores electrical charge?",
    answers: [
      { text: "Capacitor", correct: true },
      { text: "Transistor", correct: false },
      { text: "Inductor", correct: false },
      { text: "Resistor", correct: false }
    ]
  },
  {
    question: "🖥️ Computing: CPU stands for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Core Power Utility", correct: false },
      { text: "Central Program Unit", correct: false },
      { text: "Control Processing Unit", correct: false }
    ]
  },
  {
    question: "🌎 Geography: Which is the largest ocean?",
    answers: [
      { text: "Pacific Ocean", correct: true },
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }
    ]
  }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

function showQuestion() {
  resetState();

  let current = questions[currentQuestionIndex];
  questionText.innerText = current.question;

  current.answers.forEach((ans) => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.classList.add("answer-btn");
    btn.dataset.correct = ans.correct;

    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hidden");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) score++;

  // Set classes
  Array.from(answerButtons.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct === "true");
  });

  nextBtn.classList.remove("hidden");
}

function setStatusClass(button, correct) {
  if (correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreText.innerText = `You scored ${score} out of ${questions.length}`;
}
