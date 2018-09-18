const profileUrl = `${baseUrl}/users/profile`;
const pAsked = elemById('asked');
const pAnswered = elemById('answered');
const noRecent = elemById('no-recent');
const noAnswered = elemById('no-answered');

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
      if (response.mostAnswered.length === 0) {
        noAnswered.classList.remove('hidden');
      } else {
        createContent(response.mostAnswered, 'all', 'most-answered');
      }
    }
  });

const deleteQuestion = (event) => {
  event.preventDefault();
  modal.classList.remove('hidden');
};
