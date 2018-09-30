/**
 * Get and set question id for fetch operation
 * @param {element} elem Html a element
 * @returns {*} Nothing
 */
const getId = (elem) => {
  const id = elem.getAttribute('data-id');
  if (localStorage.getItem('questionId')) {
    localStorage.removeItem('questionId');
  }
  localStorage.setItem('questionId', id);
};

/**
 * Attach a mousein event to a html element
 * @param {element} link Html element to attach mousein event to
 * @returns {*} Nothing
 */
const mouseInEvent = (link) => {
  link.onmouseover = () => {
    link.querySelector('i').classList.replace('far', 'fas');
  };
};

/**
 * Attach a mouseover event to a html element
 * @param {element} link Html element to attach mouseout event to
 * @returns {*} Nothing
 */
const mouseOutEvent = (link) => {
  link.onmouseout = () => {
    link.querySelector('i').classList.replace('fas', 'far');
  };
};
/**
 * Template to create question cards
 * @param {object} question Question object
 * @param {string} elem Id selector of div to apend questions to
 * @returns {*} Nothing
 */
const questionCard = (question, elem) => {
  const section = elemById(elem);
  const h3 = create('h3');
  const a = create('a');
  const ul = create('ul');
  const liTime = create('li');
  const liAns = create('li');
  const container = create('div');

  h3.classList.add('mb-0', 'mt-0', 'display-3');

  a.setAttribute('href', 'question.html');
  a.setAttribute('data-id', question.id);
  a.classList.add('text-success');
  a.innerHTML = question.question;
  a.onclick = () => getId(a);

  h3.appendChild(a);

  liTime.innerHTML = formatTime(question.created_at);
  ul.appendChild(liTime);

  liAns.innerHTML = `<i class="far fa-comments fa-fw"></i>${question.answers}`;
  ul.appendChild(liAns);

  if (question.name) {
    const liUser = create('li');
    liUser.innerHTML = `<i class="far fa-user fa-fw"></i>${question.name}`;
    ul.appendChild(liUser);
  } else {
    const liDelete = create('li');
    const aDelete = create('a');

    aDelete.setAttribute('href', ' ');
    aDelete.innerHTML = '<i class="far fa-trash-alt fa-fw"></i>';
    aDelete.setAttribute('data-id', question.id);
    aDelete.setAttribute('class', 'js-delete');

    aDelete.onclick = event => deleteQuestion(event, aDelete);

    liDelete.appendChild(aDelete);
    ul.appendChild(liDelete);
  }

  container.setAttribute('class', 'box');

  container.appendChild(h3);
  container.appendChild(ul);

  section.appendChild(container);
};

/**
 * Create button to accept an answer on answer card
 * @param {element} liAccept Html a element
 * @returns {*} Nothing
 */
const createAcceptButton = (liAccept) => {
  const aAccept = create('a');

  aAccept.setAttribute('href', '');
  aAccept.setAttribute('class', 'js-accept');
  aAccept.setAttribute('title', 'prefer answer');

  aAccept.innerHTML = '<i class="far fa-star fa-fw"></i>';
  aAccept.onclick = event => acceptAnswer(event, aAccept);

  mouseInEvent(aAccept);
  mouseOutEvent(aAccept);
  liAccept.innerHTML = '';
  liAccept.insertBefore(aAccept, liAccept.childNodes[0]);
};

/**
 * Create upvote and downvote buttons on answer cards
 * @param {object} answer Answer object
 * @param {element} voteDiv Html div element
 * @returns {*} Nothing
 */
const createVoteButtons = (answer, voteDiv) => {
  const liUpvotes = create('li');
  const aUpvote = create('a');
  const liDownvotes = create('li');
  const aDownvote = create('a');

  aUpvote.setAttribute('class', 'upvote');
  aUpvote.innerHTML = '<i class="far fa-thumbs-up fa-fw"></i>';

  liUpvotes.innerHTML = answer.upvotes;
  liUpvotes.insertBefore(aUpvote, liUpvotes.childNodes[0]);

  aDownvote.setAttribute('class', 'downvote');
  aDownvote.innerHTML = '<i class="far fa-thumbs-down fa-fw"></i>';


  if (localStorage.getItem('token')) {
    aDownvote.setAttribute('title', 'downvote answer');
    aUpvote.setAttribute('title', 'upvote answer');

    mouseInEvent(aUpvote);
    mouseOutEvent(aUpvote);

    mouseInEvent(aDownvote);
    mouseOutEvent(aDownvote);

    aUpvote.setAttribute('href', '');
    aDownvote.setAttribute('href', '');

    aUpvote.onclick = event => voteAnswer(event, aUpvote, 1);
    aDownvote.onclick = event => voteAnswer(event, aUpvote, 0);
  } else {
    aUpvote.setAttribute('title', 'upvotes');
    aDownvote.setAttribute('title', 'downvotes');
  }

  liDownvotes.innerHTML = answer.downvotes;
  liDownvotes.insertBefore(aDownvote, liDownvotes.childNodes[0]);

  voteDiv.appendChild(liUpvotes);
  voteDiv.appendChild(liDownvotes);
};

/**
 * Create edit button on answer cards
 * @returns {element} Html link to edit answer
 */
const createEditButton = () => {
  const liEdit = create('li');
  const aEdit = create('a');
  liEdit.innerHTML = 'Edit';

  aEdit.classList.add('js-edit');
  aEdit.setAttribute('href', '');
  aEdit.innerHTML = '<i class="far fa-edit fa-fw"></i>';
  aEdit.onclick = event => editAnswer(event, aEdit);

  mouseInEvent(aEdit);
  mouseOutEvent(aEdit);

  liEdit.insertBefore(aEdit, liEdit.childNodes[0]);
  return liEdit;
};

/**
 * Create edit button on answer cards
 * @param {object} answer Answer object
 * @returns {element} Html link to comment an answer
 */
const createCommentsButton = (answer) => {
  const aComments = create('a');
  const liComments = create('li');

  liComments.innerHTML = answer.comments;
  aComments.setAttribute('title', 'view comments');

  aComments.setAttribute('href', '');
  aComments.onclick = event => showCommentModal(event, aComments);
  aComments.innerHTML = '<i class="far fa-comment-alt fa-fw"></i>';

  mouseInEvent(aComments);
  mouseOutEvent(aComments);

  liComments.insertBefore(aComments, liComments.childNodes[0]);
  return liComments;
};

/**
 * Create answer cards
 * @param {object} answer Answer object
 * @param {number} askerId User Id of question owner
 * @param {element} div Html div element to append answer cards to
 * @returns {*} Nothing
 */
const answerCard = (answer, askerId, div) => {
  const answers = elemById(div);
  const p = create('p');
  const h3 = create('h3');
  const ul = create('ul');
  const liTime = create('li');
  const liAccept = create('li');
  const container = create('div');

  p.classList.add('lead', 'mb-0');
  p.innerHTML = answer.answer;

  h3.classList.add('display-3', 'mb-0');
  h3.innerHTML = `
  <i class="far fa-user text-success"></i>
  <span class="mr-1">${answer.name}</span>
  <span class="text-primary">
  <i class="far fa-envelope fa-fw text-success"></i>
  <span>
  <a href="mailto:${answer.email}" class="text-primary">${answer.email}</a>
  </span>
  </span>
  `;

  liTime.innerHTML = `answered ${formatTime(answer.created_at)}`;
  ul.appendChild(liTime);

  const userId = parseInt(localStorage.getItem('userId'), 10);

  if (userId !== answer.user_id) {
    const voteDiv = create('div');
    voteDiv.setAttribute('class', 'd-inline');

    createVoteButtons(answer, voteDiv);
    ul.appendChild(voteDiv);
  }

  const liComments = createCommentsButton(answer);
  ul.appendChild(liComments);

  if (userId === answer.user_id) {
    const liEdit = createEditButton();
    ul.appendChild(liEdit);
  }

  if (answer.is_accepted) {
    liAccept.id = 'prev-accepted';
    liAccept.innerHTML = `
    <span>
      <i class="fas fa-star"></i>
    </span>
 `;
  } else if (userId === askerId && !answer.is_accepted) {
    createAcceptButton(liAccept);
  }

  ul.appendChild(liAccept);
  ul.setAttribute('data-id', answer.id);

  container.classList.add('fadeIn', 'box');
  container.appendChild(p);
  container.appendChild(h3);
  container.appendChild(ul);

  answers.appendChild(container);
};
