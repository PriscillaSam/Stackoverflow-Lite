const commentModal = elemById('comments-modal');
const answerTitle = elemById('comments-answer');
const commentsCount = elemById('comments-count');
const commentsSection = elemById('comments');
const infoSection = elemById('answer-info');

const commentForm = elemById('comment-form');
const commentInput = elemById('comment-input');
const newCommentSection = elemById('new-comment');
const noComments = elemById('no-comment');

/* Reset the comment divs
 */
const resetComments = () => {
  newCommentSection.innerHTML = '';
  noComments.innerHTML = '';
  commentsSection.innerHTML = '';
};
/**
 * Generate comment cards
 * @param {object} comments Comment object
 * @returns {string} Content of comment section
 */
const generateComments = (comments) => {
  let string = '';
  comments.forEach((comment) => {
    string = ` ${string}
    <div class="shadow p-2 mt-2" style="border-radius: 5px;">
      <h3 class="display-3">${comment.comment}</h3>
      <p class="display-3 text-info">${comment.name}
        <span class="text-success text-sm"> commented </span>
      ${formatTime(comment.created_at)}<p>
    </div>`;
  });
  return string;
};

/**
 * DIsplay content on comment modal
 * @param {object} response Response from
 * @returns {*} Nothing
 */
const displayResponse = (response) => {
  const { comments, answer } = response;
  const spin = !answer.is_accepted
    ? ''
    : `
    <i class="fa fa-star fa-spin fa-lg ml-2 text-success" 
    title="Preferred answer">
    </i>`;

  answerTitle.innerHTML = `
  ${answer.answer}
  `;
  infoSection.innerHTML = `
  ${answer.name}
  <span class="text-success text-sm"> answered </span>
  ${formatTime(answer.created_at)} ${spin}
  `;

  if (!comments) {
    noComments.innerHTML = `
    <div class="shadow p-2 mt-2" style="border-radius: 5px;">
      <h3 class="display-3 text-primary text-center">${response.message}</h3>
    </div>`;
    commentsCount.innerHTML = `
    <i class="far fa-comments mr-1">
    </i>0 Comments
    `;
  } else {
    commentsCount.innerHTML = `
    <i class="far fa-comments  mr-1">
    </i>${comments.length} Comment${comments.length === 1 ? '' : 's'}
    `;
    commentsSection.innerHTML = generateComments(comments);
  }
};

/**
 * Get comments belonging to an answer
 * @param {number} answerId Answer ID of answer to get comments for
 * @returns {*} Nothing
 */
const getComments = (answerId) => {
  const commentUrl = `
${baseUrl}/questions/${questionId}/answers/${answerId}/comments`;
  fetch(commentUrl, {
    method: 'GET',
  })
    .then(response => response.json())
    .then((response) => {
      displayResponse(response);
    });
};

/**
 * Display comment modal
 * @param {event} event Event
 * @param {element} link Html element
 * @returns {*} Nothing
 */
const showCommentModal = (event, link) => {
  event.preventDefault();
  resetComments();
  commentModal.classList.remove('hidden');

  answerId = getAnswerId(link);
  getComments(answerId);
};

/**
 * post comment section
 */
commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const commentUrl = `
${baseUrl}/questions/${questionId}/answers/${answerId}/comments`;

  refresh(commentForm);
  btnActivity(commentBtn);

  fetch(commentUrl, {
    method: 'POST',
    body: JSON.stringify({
      comment: commentInput.value,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => response.json())
    .then((response) => {
      refreshBtn(commentBtn);
      btnTextDisplay(commentBtn,
        '<i class="far fa-comment-alt fa-fw"></i> Comment');
      if (response.errorData) {
        errorResponse(response, commentForm);
      } else {
        successResponse(response, commentForm);
        const comment = response.new_comment;
        comment.name = localStorage.getItem('name');

        noComments.classList.add('fadeOut');
        setTimeout(() => {
          noComments.classList.add('hidden');
          refresh(commentForm);
          commentInput.value = '';
        }, 2000);

        newCommentSection.innerHTML += `
        <div class="shadow fadeIn p-2 mt-2" style="border-radius: 5px;">
        <h3 class="display-3">${comment.comment}</h3>
        <p class="display-3 text-info">${comment.name}
          <span class="text-success text-sm"> commented </span>
        ${formatTime(comment.created_at)}
        </p>
      </div>`;
      }
    });
});
