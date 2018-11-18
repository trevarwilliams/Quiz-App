'use strict'

let questionNum = 0;
let score = 0;

function generateQuizBody() {
    return `
    <form id="quiz">
    <fieldset>
    <legend><h2>${quizInfo[questionNum].question}</h2></legend>

    <label for="answerOptionA" class="answerLabel">
        <input type="radio" value="${quizInfo[questionNum].answers[0]}" id="answerOptionA" name="answer" required>
        <span>${quizInfo[questionNum].answers[0]}</span>
    </label>

    <label for="answerOptionB" class="answerLabel">
        <input type="radio" value="${quizInfo[questionNum].answers[1]}" id="answerOptionB" name="answer" required>
        <span>${quizInfo[questionNum].answers[1]}</span>
    </label>
    
    <label for="answerOptionC" class="answerLabel">
        <input type="radio" value="${quizInfo[questionNum].answers[2]}" id="answerOptionC" name="answer" required>
        <span>${quizInfo[questionNum].answers[2]}</span>
    </label>

    <label for="answerOptionD" class="answerLabel">
        <input type="radio" value="${quizInfo[questionNum].answers[3]}" id="answerOptionD" name="answer" required>
        <span>${quizInfo[questionNum].answers[3]}</span>
    </label>    

    <button type="submit" class="submitAnswer" name="submit" value="Submit Answer">Submit Answer</button>
    </fieldset>
    </form>`
}

function generateFeedbackBody(status) {
    const title = `<h2>${quizInfo[questionNum].question}</h2>`
    const nextButton = `<button type="submit" class="nextButton" name="next" value="Next Question"><span>Next Question</span></button>`;
    if (status) {
        // desired correct feedback
        return `
        ${title}
        <section class="feedbackContainer">
        <span class="feedback">${quizInfo[questionNum].correctFeedback}</span>
        </section>
        ${nextButton}`
    }
    else {
        // desired incorrect feedback
        return `
        ${title}
        <section class="feedbackContainer">
        <span class="feedback">${quizInfo[questionNum].incorrectFeedback}</span>
        </section>
        ${nextButton}`
    }
}

function generateResultsBody() {
    const results = `<span class="results">You got ${score} of 10 correct!</span>`
    const restartButton = `<button type="submit" class="restartButton" name="restart" value="Restart Quiz"><span>Restart Quiz</span></button>`
        return `
        <h2>${results}</h2>
        ${restartButton}`
}

function renderQuiz() {
    $('.quizBody').html(generateQuizBody());
    answerClick();
}

function renderFeedback(status) {
    $('.quizBody').html(generateFeedbackBody(status));
    nextClick();
}

function renderResults() {
    $('.quizBody').html(generateResultsBody());
    restartQuiz();
}

function startQuiz() {
    $('.quizBody').hide();
    $('.startButton').on( 'click', event => {
        event.preventDefault();
        toggleBody();
        generateQuizBody();
        displayQuestionNum();
        renderQuiz();
    })
}

function answerClick() {
    $('.submitAnswer').on('click', event => {
        event.preventDefault();
        if ($('input:checked').val() === quizInfo[questionNum].correctAnswer) {
            renderFeedback(true);
            updateScore();
        }
        else if ($('input:checked').val() === undefined) {
            // do nothing
            // alert('Please select an answer to continue.');
            $('#quiz').validate({
              // rules
            });
        }
        else {
            renderFeedback(false);
        }
    })
}

function nextClick() {
    $('.nextButton').on('click', event => {
        event.preventDefault();
        if (questionNum + 1 < quizInfo.length) {
            incrementQuestionNum();
            generateQuizBody();
            displayQuestionNum();
            renderQuiz();
        }
        else {
            generateResultsBody();
            renderResults();
        }
    })
}

function toggleBody() {
        $('.startPage').toggle();
        $('.quizBody').toggle();
    }

function restartQuiz() {
/*
only works when not saving/talking to a database
*/
    $('.restartButton').on('click', event => {
        location.reload();
    })
}

function displayQuestionNum() {
    $('.questionNum').text(questionNum + 1);
}

function incrementQuestionNum() {
    questionNum++;
}

function updateScore() {
    score++;
    $('.score').text(score);
}

$(startQuiz);