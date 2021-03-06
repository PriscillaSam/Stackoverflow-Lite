const profileUrl = `${baseUrl}/users/profile`;
const pAsked = elemById('asked');
const pAnswered = elemById('answered');
const noRecent = elemById('no-recent');
const noAnswered = elemById('no-answered');
const delBtns = elemByClass('js-delete');

fetch(profileUrl, {
  method: 'GET',
  headers: {
    Authorization: token,
  },
})
  .then(response => response.json())
  .then((response) => {
    pAsked.innerHTML = response.asked;
    pAnswered.innerHTML = response.answers;

    if (response.recent.length === 0) {
      noRecent.classList.remove('hidden');
      noAnswered.classList.remove('hidden');
      noAnswered.querySelector('p')
        .innerHTML = 'You haven\'t asked any question yet';
    }
    if (response.recent.length !== 0) {
      createContent(response.recent, 'all', 'recent');
      if (response.most_answered.length === 0) {
        noAnswered.classList.remove('hidden');
      } else {
        createContent(response.most_answered, 'all', 'most-answered');
      }
    }
  });

let questionId;

/**
 * Displays question delete confirmation modal
 * @param {event} event Event
 * @param {element} link Html a element
 * @returns {*} Nothing
 */
const deleteQuestion = (event, link) => {
  event.preventDefault();
  modal.classList.remove('hidden');
  questionId = link.getAttribute('data-id');
};

/**
 * Performs question delete operation
 * @returns {*} Nothing
 */
const deleteConfirmed = () => {
  const delUrl = `${baseUrl}/questions/${questionId}`;

  fetch(delUrl, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then(() => {
      deleteNotif.classList.remove('hidden');
      [...delBtns].forEach((btn) => {
        if (btn.getAttribute('data-id') === questionId) {
          setTimeout(() => {
            btn.closest('.box').classList.add('fadeOut');
          }, 1000);
          setTimeout(() => {
            btn.closest('.box').classList.add('hidden');
          }, 2000);
        }
      });
    });
};
