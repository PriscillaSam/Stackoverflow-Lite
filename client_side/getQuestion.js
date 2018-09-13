const questionDiv = elemById('question-section');
const answerForm = elemById('answer-form');
const questionId = localStorage.getItem('questionId');
const answerBtn = elemById('answer-btn');
const newAnswerDiv = elemById('new-answer');

// const getUrl = 'https://so-lite.herokuapp.com/api/v1/questions/${id}';
// const url = 'https://so-lite.herokuapp.com/api/v1/questions';
const getUrl = `http://localhost:3000/api/v1/questions/${questionId}`;
const postUrl = `http://localhost:3000/api/v1/questions/${questionId}/answers`;

fetch(getUrl, {
  method: 'GET',
})
  .then(response => response.json())
  .then((response) => {
    const body = response.questionObj;
    questionDiv.innerHTML = `
    <h4 class="display-4 text-primary mb-0 fadeIn">
     <i class="fa fa-edit"></i> 
     <strong>${body.question}</strong>
    </h4>            
    <p class="ml-2 mt-0">
      <span class="mr-1">asked ${body.createdat}</span>
      <span>
      <i class="fa fa-user-o fa-fw"></i>
      <span id="asker">${body.name}</span>
      </span>
      <span class="text-success">
        <i class="fa fa-comments-o fa-fw"></i>${body.answers.length} answers
      </span>
    </p>
  `;
    localStorage.setItem('questionUser', body.name);
    body.answers.forEach((answer) => {
      answerCard(answer, body.name, 'answers');
    });
  });

if (localStorage.getItem('token')) {
  answerBtn.removeAttribute('disabled');
}

answerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  refresh(answerForm);
  btnActivity(answerBtn);

  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify({
      answer: elemById('answer-input').value,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      refreshBtn(answerBtn);
      btnTextDisplay(answerBtn, 'Submit');
      if (response.errorData) {
        errorResponse(response, answerForm);
      } else {
        successResponse(response, answerForm);
        response.newAnswer.email = localStorage.getItem('email');
        const asker = elemById('asker').innerHTML;
        response.newAnswer.name = localStorage.getItem('name');
        answerCard(response.newAnswer, asker, 'new-answer');

        setTimeout(() => {
          refresh(answerForm);
          elemById('answer-input').value = '';
        }, 2000);
      }
    });
});
