const form = elemById('question-form');
const alertBox = getAlertBox(form);
const alertText = getAlertText(form);
const questionBtn = elemById('question-btn');
const newQuestion = elemById('new-question');
const token = localStorage.getItem('token');

const url = `${baseUrl}/questions`;


const btnText = `
<i class="fa fa-share fa-fw"></i>Post Question`;

const appendQuestion = (question) => {
  const noRecent = elemById('no-recent');
  if (noRecent) {
    if (!noRecent.classList.contains('hidden')) {
      noRecent.classList.add('fadeOut');
      setTimeout(() => {
        noRecent.classList.add('hidden');
      }, 300);
    }
  }
  questionCard(question, 'new-question');
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  refresh(form);
  btnActivity(questionBtn);

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      question: elemById('question-input').value,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      refreshBtn(questionBtn);
      btnTextDisplay(questionBtn, btnText);
      if (response.errorData) {
        errorResponse(response, form);
      } else {
        successResponse(response, form);
        setTimeout(() => {
          refresh(form);
          elemById('question-input').value = '';
          if (newQuestion) appendQuestion(response.new_question);

          const modal = elemById('question-modal');
          if (modal) modal.querySelector('.cl-modal').click();
        }, 1500);
      }
    });
});
