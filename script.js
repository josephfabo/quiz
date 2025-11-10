const quizzes = [
    {
      name: "Math Quiz",
      questions: [
        { q: "2 + 2 = ?", options: ["3", "4", "5"], answer: "4" },
        { q: "5 * 3 = ?", options: ["15", "10", "20"], answer: "15" },
      ]
    },
    {
      name: "Science Quiz",
      questions: [
        { q: "Water formula?", options: ["H2O", "CO2", "O2", "SO4"], answer: "H2O" },
        { q: "Sun rises from?", options: ["West", "East", "North"], answer: "East" },
      ]
    },
    {
      name: "History Quiz",
      questions: [
        { q: "Who discovered America?", options: ["Columbus", "Einstein", "Newton"], answer: "Columbus" },
        { q: "World War II ended in?", options: ["1945", "1939", "1918"], answer: "1945" },
      ]
    }
  ];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

function showOption(){
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('quiz_container').style.display = 'none';
}

function startQuiz(quizIndex){
    no = quizIndex;
    currentQuiz = quizzes[quizIndex];
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-selection').style.display = 'none';
    document.getElementById('quiz_container').style.display = 'block';
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    const questionObj = currentQuiz.questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + questionObj.q;
    answerButtons.innerHTML = '';
    answered = questionObj.answer;

    questionObj.options.forEach( option => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(option == answered){
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${quizzes[no].questions.length}!`;
    nextButton.innerHTML ="Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizzes[no].questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < quizzes[no].questions.length){
        handleNextButton();
    }else{
        showOption();
    }
})


