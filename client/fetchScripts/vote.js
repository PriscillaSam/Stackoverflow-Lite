const upvoteBtns = elemByClass('upvote');
const downvoteBtns = elemByClass('downvote');

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
      if (response.status === 'error') alert(response.message);
      else {
        const div = link.closest('div');
        div.innerHTML = '';
        createVoteButtons(response.answer, div);
      }
    });
};
