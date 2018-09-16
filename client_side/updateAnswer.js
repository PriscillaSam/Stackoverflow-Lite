const confirmBtn = elemById('confirm');
const confirmBox = elemById('accept-box');
const updateForm = elemById('update-form');
const updateInput = elemById('update-input');
const updateBtn = elemById('update-btn');
let answerId;

const preferAnswer = (link) => {
  const updateUrl = `
  https://so-lite.herokuapp.com/questions/${questionId}/answers/${answerId}
`;
  fetch(updateUrl, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(() => {
      confirmBox.classList.add('slideOutDown');

      setTimeout(() => {
        setTimeout(() => {
          confirmBox.closest('.modal').classList.add('hidden');
          confirmBox.classList.remove('slideOutDown');
        }, 500);
        const previous = elemById('prev-accepted');
        console.log(previous);
        if (previous) {
          previous.removeAttribute('id');
          createAcceptLink(previous);
          console.log(previous);
        }
        console.log(link.parentNode);
        link.parentNode.id = 'prev-accepted';
        link.closest('li').innerHTML = `
          <span class="badge badge-dark">
            <i class="fa fa-lg fa-check"></i>
          </span>
        `;
      });
    });
};

const acceptAnswer = (event, link) => {
  event.preventDefault();
  answerId = link.closest('ul').getAttribute('data-id');
  acceptModal.classList.remove('hidden');

  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    preferAnswer(link);
  });
};

const updateBtnText = '<i class="fa fa-upload mr-1"></i>Save';
const updateAnswer = (answerDiv) => {
  const updateUrl = `
  https://so-lite.herokuapp.com/questions/${questionId}/answers/${answerId}
`;
  fetch(updateUrl, {
    method: 'PUT',
    body: JSON.stringify({
      answer: elemById('update-input').value,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      refreshBtn(updateBtn);
      btnTextDisplay(updateBtn, updateBtnText);
      if (response.errorData) {
        errorResponse(response, updateForm);
      } else {
        successResponse(response, updateForm);
        answerDiv.innerHTML = response.updatedAnswer.answer;
        setTimeout(() => {
          refresh(updateForm);
          elemById('update-modal').querySelector('.cl-modal').click();
        }, 1500);
      }
    });
};

const editAnswer = (event, link) => {
  event.preventDefault();
  showUpdateModal();
  const ul = link.closest('ul');
  answerId = ul.getAttribute('data-id');

  const answerDiv = link.closest('.box').querySelector('.lead');
  updateInput.innerHTML = answerDiv.innerHTML;

  updateForm.addEventListener('submit', (e) => {
    refresh(updateForm);
    btnActivity(updateBtn);
    e.preventDefault();
    updateAnswer(answerDiv);
  });
};
