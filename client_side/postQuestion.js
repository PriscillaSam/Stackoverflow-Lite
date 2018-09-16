const form = elemById('question-form');
const alertBox = getAlertBox(form);
const alertText = getAlertText(form);
const questionBtn = elemById('question-btn');

const token = localStorage.getItem('token');

const url = 'https://so-lite.herokuapp.com/api/v1/questions';


const btnText = `
<i class="fa fa-share fa-fw"></i>Post Question`;

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
          elemById('question-modal').querySelector('.cl-modal').click();
        }, 1500);
      }
    });
});
