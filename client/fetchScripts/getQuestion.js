const questionDiv = elemById('question-section');
const answerForm = elemById('answer-form');
const questionId = localStorage.getItem('questionId');
const answerBtn = elemById('answer-btn');
const commentBtn = elemById('comment-btn');
const newAnswerDiv = elemById('new-answer');
const notifyLogin = elemByClass('notify-login');

const getUrl = `${baseUrl}/questions/${questionId}`;
const postUrl = `${baseUrl}/questions/${questionId}/answers`;

fetch(getUrl, {
  method: 'GET',
})
  .then(response => response.json())
  .then((response) => {
    const body = response.question_details;
    questionDiv.innerHTML = `
    <h4 class="display-4 text-primary mb-0 fadeIn">
     <i class="fas fa-sort"></i> 
     <strong>${body.question}</strong>
    </h4>            
    <p class="mt-0">
      <span class="mr-1">asked ${formatTime(body.created_at)}</span>
      <span class="mr-1">
      <i class="far fa-user fa-fw"></i>${body.name}
      </span>
      <span class="text-success">
        <i class="far fa-comments fa-fw"></i>${body.answers.length} answers
      </span>
    </p>
  `;
    localStorage.setItem('askerId', body.user_id);
    body.answers.forEach((answer) => {
      answerCard(answer, body.user_id, 'answers');
    });
  }).catch((error) => {
    displayErrorNotification(error);
  });


if (localStorage.getItem('token')) {
  answerBtn.removeAttribute('disabled');
  commentBtn.removeAttribute('disabled');
  [...notifyLogin].forEach(a => a.classList.add('hidden'));
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
        const answer = response.new_answer;
        const askerId = localStorage.getItem('askerId');

        answer.email = localStorage.getItem('email');
        answer.name = localStorage.getItem('name');

        answerCard(answer, askerId, 'new-answer');

        setTimeout(() => {
          refresh(answerForm);
          elemById('answer-input').value = '';
        }, 2000);
      }
    })
    .catch((error) => {
      displayErrorNotification(error);
    });
});
