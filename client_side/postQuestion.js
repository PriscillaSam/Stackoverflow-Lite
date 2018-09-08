const form = elemById('question-form');
const alertBox = elemByClass('alert')[0];
const alertText = elemById('alert-text');
const questionBtn = elemById('question-btn');

const token = localStorage.getItem('token');

const url = 'http://localhost:3000/api/v1/questions';
// const url = 'https://so-lite.herokuapp.com/api/v1/questions';


form.addEventListener('submit', (event) => {
  alertBox.classList.add('hidden', 'bg-danger');
  alertBox.classList.remove('bg-success');

  event.preventDefault();
  questionBtn.innerHTML = `
  <span>
    <i class="fa fa-spin fa-spinner fa-lg fa-fw"></i>
    Please wait...
  </span>`;

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
    .then((body) => {
      alertBox.classList.remove('hidden');
      questionBtn.innerHTML = `
      <span>
        <i class="fa fa-share fa-lg fa-fw"></i>
        Post Question
      </span>
      `;
      if (body.errorData) {
        alertText.innerHTML = Object.values(body.errorData.errorMessages);
      } else {
        alertBox.classList.replace('bg-danger', 'bg-success');
        alertText.innerHTML = body.message;

        setTimeout(() => {
          elemById('question-modal').querySelector('.cl-modal').click();
        }, 1500);
      }
    });
});
