const questionDiv = elemById('question-section');
const answerForm = elemById('answer-form');
const questionId = localStorage.getItem('questionId');
const answerBtn = elemById('answer-btn');
const newAnswerDiv = elemById('new-answer');

const getUrl = `${baseUrl}/questions/${questionId}`;
const postUrl = `${baseUrl}/questions/${questionId}/answers`;


fetch(getUrl, {
  method: 'GET',
})
  .then(response => response.json())
  .then((response) => {
    const body = response.questionObj;
    questionDiv.innerHTML = `
    <h4 class="display-4 text-primary mb-0 fadeIn">
     <i class="fa fa-unsorted"></i> 
     <strong>${body.question}</strong>
    </h4>            
    <p class="ml-2 mt-0">
      <span class="mr-1">asked ${formatTime(body.createdat)}</span>
      <span>
      <i class="fa fa-user-o fa-fw"></i>${body.name}
      </span>
      <span class="text-success">
        <i class="fa fa-comments-o fa-fw"></i>${body.answers.length} answers
      </span>
    </p>
  `;
    localStorage.setItem('askerId', body.userid);
    body.answers.forEach((answer) => {
      answerCard(answer, body.userid, 'answers');
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
        const answer = response.newAnswer;
        answer.email = localStorage.getItem('email');
        const askerId = localStorage.getItem('askerId');
        answer.name = localStorage.getItem('name');
        answerCard(answer, askerId, 'new-answer');

        setTimeout(() => {
          refresh(answerForm);
          elemById('answer-input').value = '';
        }, 2000);
      }
    });
});
