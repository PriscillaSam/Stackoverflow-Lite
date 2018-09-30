const upvoteBtns = elemByClass('upvote');
const downvoteBtns = elemByClass('downvote');


/**
 * Performs operation to vote an answer
 * @param {event} event Event
 * @param {element} link Html a element
 * @param {number} vote Votestatus (0 or 1)
 * @returns {*} Nothing
 */
const voteAnswer = (event, link, vote) => {
  event.preventDefault();
  answerId = getAnswerId(link);
  const voteUrl = `${baseUrl}/answers/${answerId}/votes`;

  fetch(voteUrl, {
    method: 'POST',
    body: JSON.stringify({
      vote,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      if (response.status === 'error') {
        displayErrorNotification(response.message);
      } else {
        const div = link.closest('div');
        div.innerHTML = '';
        createVoteButtons(response.answer, div);
      }
    })
    .catch((error) => {
      displayErrorNotification(error);
    });
};
