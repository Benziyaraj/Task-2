const allQuestions = [
  {
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answerIndex: 1
  },
  {
    text: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Leo Tolstoy", "Mark Twain", "Charles Dickens"],
    answerIndex: 0
  },
  {
    text: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Kyoto"],
    answerIndex: 1
  },
  {
    text: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answerIndex: 1
  },
  {
    text: "What is the largest mammal on Earth?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Orca"],
    answerIndex: 1
  },
  {
  text: "Which continent is the Sahara Desert located in?",
  options: ["Asia", "Africa", "Australia", "South America"],
  answerIndex: 1
},
{
  text: "Who painted the Mona Lisa?",
  options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
  answerIndex: 0
},
{
  text: "What is the smallest prime number?",
  options: ["0", "1", "2", "3"],
  answerIndex: 2
},
{
  text: "Which is the longest river in the world?",
  options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
  answerIndex: 2
},
{
  text: "In which year did the Titanic sink?",
  options: ["1912", "1905", "1920", "1898"],
  answerIndex: 0
},
{
  text: "Which element has the chemical symbol 'O'?",
  options: ["Oxygen", "Gold", "Osmium", "Ozone"],
  answerIndex: 0
},
{
  text: "What is the currency of the United Kingdom?",
  options: ["Euro", "Pound Sterling", "Dollar", "Franc"],
  answerIndex: 1
},
{
  text: "Which is the fastest land animal?",
  options: ["Cheetah", "Horse", "Lion", "Leopard"],
  answerIndex: 0
},
{
  text: "Which ocean is the largest?",
  options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
  answerIndex: 2
},
{
  text: "How many planets are in our Solar System?",
  options: ["7", "8", "9", "10"],
  answerIndex: 1
}

];

// DOM elements
const container = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");

// State
let questions = [];
let currentIndex = 0;
let score = 0;
let selected = null;
let timerId;
let timeLeft = 20;

// shuffle helper
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Start quiz
function startQuiz() {
  questions = shuffle([...allQuestions]); // shuffle once, no repeats
  currentIndex = 0;
  score = 0;
  showQuestion();
  updateProgress();
  restartBtn.hidden = true;
  nextBtn.hidden = false;
}

// Show a question
function showQuestion() {
  clearInterval(timerId);
  timeLeft = 20;
  updateTimer();
  timerId = setInterval(countDown, 1000);

  const q = questions[currentIndex];
  const options = shuffle(q.options.map((opt, i) => ({ text: opt, i })));

  container.innerHTML = `
    <div class="question"><strong>${q.text}</strong></div>
    <div class="options">
      ${options.map(o => `
        <label>
          <input type="radio" name="option" value="${o.i}">
          ${o.text}
        </label>
      `).join("")}
    </div>
  `;

  selected = null;
  nextBtn.disabled = true;

  document.querySelectorAll("input[name='option']").forEach(input => {
    input.addEventListener("change", e => {
      selected = parseInt(e.target.value, 10);
      nextBtn.disabled = false;
    });
  });
}

// Next button click
function nextQuestion() {
  if (selected === questions[currentIndex].answerIndex) {
    score++;
  }

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
    updateProgress();
  } else {
    endQuiz();
  }
}

// End Quiz
function endQuiz() {
  clearInterval(timerId);
  container.innerHTML = `<h2>You scored ${score} / ${questions.length}</h2>`;
  nextBtn.hidden = true;
  restartBtn.hidden = false;
  progressEl.textContent = "";
  timerEl.textContent = "";
}

// Timer
function countDown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timerId);
    nextBtn.disabled = false;
    document.querySelectorAll("input[name='option']").forEach(i => i.disabled = true);
  }
}

function updateTimer() {
  timerEl.textContent = `Time left: ${timeLeft}s`;
}

// Progress
function updateProgress() {
  progressEl.textContent = `Q${currentIndex + 1} of ${questions.length}`;
}

// Events
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

// Start initially
startQuiz();
