const confirmBtn = elemById('confirm');
const confirmBox = elemById('accept-box');
const updateForm = elemById('update-form');
const updateInput = elemById('update-input');
const updateBtn = elemById('update-btn');
let answerId;

/**
 * Performs operation to set an answer as preferred
 * @param {element} link Html a element
 * @returns {*} Nothing
 */
const preferAnswer = (link) => {
  const updateUrl = `
 ${baseUrl}/questions/${questionId}/answers/${answerId}
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
          createAcceptButton(previous);
          console.log(previous);
        }
        console.log(link.parentNode);
        link.parentNode.id = 'prev-accepted';
        link.closest('li').innerHTML = `
          <span class="">
            <i class="fa fa-star"></i>
          </span>
        `;
      });
    });
};

/**
 * Get answer id from answer card
 * @param {element} link Html a element
 * @returns {*} Nothing
 */
const getAnswerId = link => link.closest('ul').getAttribute('data-id');


/**
 * Displays modal to mark an answer as preferred
 * @param {event} event Event
 * @param {element} link Html a element
 * @returns {*} Nothing
 */
const acceptAnswer = (event, link) => {
  event.preventDefault();
  acceptModal.classList.remove('hidden');
  answerId = getAnswerId(link);
  confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    preferAnswer(link);
  });
};

const updateBtnText = '<i class="fa fa-upload mr-1"></i>Save';

/**
 * Performs operation to update an answer
 * @param {element} answerDiv Html div element
 * @returns {*} Nothing
 */
const updateAnswer = (answerDiv) => {
  const updateUrl = `
  ${baseUrl}/questions/${questionId}/answers/${answerId}
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
        answerDiv.innerHTML = response.updated_answer.answer;
        setTimeout(() => {
          refresh(updateForm);
          elemById('update-modal').querySelector('.cl-modal').click();
        }, 1500);
      }
    });
};

/**
 * Display modal to update an answer
 * @param {event} event Event
 * @param {*} link Html a element
 * @returns {*} Nothing
 */
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
