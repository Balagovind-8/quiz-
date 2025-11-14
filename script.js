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
  },
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
      { text: "Creative Styling System", correct: false },
       { text: "Cascading Style Sheets", correct: true },
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
     
      { text: "Core Power Utility", correct: false },
      { text: "Central Program Unit", correct: false },
      { text: "Control Processing Unit", correct: false },
       { text: "Central Processing Unit", correct: true }
    ]
  },
  {
    question: "🌎 Geography: Which is the largest ocean?",
    answers: [
   
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
         { text: "Pacific Ocean", correct: true },
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

  document.body.classList.remove("correct-bg", "wrong-bg");

if (correct) {
    document.body.classList.add("correct-bg");
} else {
    document.body.classList.add("wrong-bg");
}


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
