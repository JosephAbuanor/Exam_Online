const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progressText');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


var fullurl = window.location.href;
var url = fullurl.split('=');
var newurl = url[url.length - 1];


if (newurl == "history"){
subject = 'https://opentdb.com/api.php?amount=100&category=23&difficulty=medium&type=multiple'
  
} else if (newurl == "science+in+technology"){
subject = 'https://opentdb.com/api.php?amount=100&category=18&difficulty=medium&type=multiple'
}
else if (newurl == "general+knowledge"){
subject = 'https://opentdb.com/api.php?amount=100&category=9&difficulty=medium&type=multiple'
}
else if (newurl == "geography"){
subject = 'https://opentdb.com/api.php?amount=100&category=22&difficulty=medium&type=multiple'
}
/*
var techscience = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
var history = 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple'
var genknow = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple'
var geography ='https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple'
*/

let questions = [];
fetch(subject) //link to questions from Open Trivia 
.then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        game.classList.remove('hidden');
        loader.classList.add('hidden');
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

const correct_bonus = 10;
const max_questions = 5;

startGame = ()=> {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();

};

getNewQuestion = () =>{

if (availableQuestions.length == 0||questionCounter >=  max_questions){
  localStorage.setItem("mostRecentScore", score);
  urlscore = "/Quizapp/end.html?score="+score;

  return window.location.assign(urlscore);
  }

questionCounter++;
progressText.innerText = "Question" +questionCounter + "/" + max_questions;
progressBarFullval = (questionCounter/max_questions)*100;
progressBarFull.style.width = progressBarFullval+ "%";


const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
currentQuestionVar = currentQuestion.question;
newCurrentQuestion = currentQuestionVar.replace(/039;/g, '\'').replace(/&#/g, '\'').replace(/&quot;/g, '\"').replace(/&amp;/g, '&') //replace the encoded characters("&quot;") that appears in the question with actual quotes.
question.innerText = newCurrentQuestion ;

choices.forEach(choice => {
  const number = choice.dataset["number"];
  choice.innerText = currentQuestion['choice' + number];
});

availableQuestions.splice(questionIndex,1);
acceptingAnswers = true;

};

choices.forEach(choice=>{
choice.addEventListener('click', e=>{
  if(!acceptingAnswers)return;

  acceptingAnswers= false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];

const classToApply = selectedAnswer== currentQuestion.answer? "correct":"incorrect"
if(classToApply == "correct"){
  incrementScore(correct_bonus);
}


  selectedChoice.parentElement.classList.add(classToApply);

  setTimeout(() =>{
    selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
  },1000);

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;

};


  })
});

