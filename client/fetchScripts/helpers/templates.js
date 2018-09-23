const getId = (elem) => {
  const id = elem.getAttribute('data-id');
  if (localStorage.getItem('questionId')) {
    localStorage.removeItem('questionId');
  }
  localStorage.setItem('questionId', id);
};


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

  liAns.innerHTML = `<i class="fa fa-comments-o fa-fw"></i>${question.answers}`;
  ul.appendChild(liAns);

  if (question.name) {
    const liUser = create('li');
    liUser.innerHTML = `<i class="fa fa-user-o fa-fw"></i>${question.name}`;
    ul.appendChild(liUser);
  } else {
    const liDelete = create('li');
    const aDelete = create('a');

    aDelete.setAttribute('href', ' ');
    aDelete.innerHTML = '<i class="fa fa-trash-o fa-fw"></i>';
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


const createAcceptButton = (liAccept) => {
  const aAccept = create('a');

  aAccept.setAttribute('href', '');
  aAccept.setAttribute('class', 'js-accept');
  aAccept.setAttribute('title', 'prefer answer');

  aAccept.innerHTML = '<i class="fa fa-star-o fa-fw"></i>';
  aAccept.onclick = event => acceptAnswer(event, aAccept);

  liAccept.innerHTML = '';
  liAccept.insertBefore(aAccept, liAccept.childNodes[0]);
};

const createVoteButtons = (answer, voteDiv) => {
  const liUpvotes = create('li');
  const aUpvote = create('a');
  const liDownvotes = create('li');
  const aDownvote = create('a');

  aUpvote.setAttribute('href', '');
  aUpvote.setAttribute('title', 'upvote answer');
  aUpvote.setAttribute('class', 'upvote');
  aUpvote.onclick = event => voteAnswer(event, aUpvote, 1);
  aUpvote.innerHTML = '<i class="fa fa-thumbs-o-up fa-fw"></i>';

  liUpvotes.innerHTML = answer.upvotes;
  liUpvotes.insertBefore(aUpvote, liUpvotes.childNodes[0]);

  aDownvote.setAttribute('href', '');
  aDownvote.setAttribute('title', 'downvote answer');
  aDownvote.setAttribute('class', 'downvote');
  aDownvote.onclick = event => voteAnswer(event, aUpvote, 0);
  aDownvote.innerHTML = '<i class="fa fa-thumbs-o-down fa-fw"></i>';

  liDownvotes.innerHTML = answer.downvotes;
  liDownvotes.insertBefore(aDownvote, liDownvotes.childNodes[0]);

  voteDiv.appendChild(liUpvotes);
  voteDiv.appendChild(liDownvotes);
};

const answerCard = (answer, askerId, div) => {
  const answers = elemById(div);
  const p = create('p');
  const a = create('a');
  const h3 = create('h3');
  const ul = create('ul');
  const liTime = create('li');
  const liAccept = create('li');
  const container = create('div');

  p.classList.add('lead', 'mb-0');
  p.innerHTML = answer.answer;

  h3.classList.add('display-3', 'mb-0');
  h3.innerHTML = `
  <i class="fa fa-user-o text-success"></i>
  <span class="mr-1">${answer.name}</span>
  <span class="text-primary">
  <i class="fa fa-envelope-o fa-fw text-success"></i>
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

  if (userId === answer.user_id) {
    const liEdit = create('li');
    const aEdit = create('a');
    liEdit.innerHTML = 'Edit';

    aEdit.classList.add('js-edit');
    aEdit.setAttribute('href', '');
    aEdit.innerHTML = '<i class="fa fa-edit fa-fw"></i>';
    aEdit.onclick = event => editAnswer(event, aEdit);

    liEdit.insertBefore(aEdit, liEdit.childNodes[0]);
    ul.appendChild(liEdit);
  }

  if (answer.is_accepted) {
    liAccept.id = 'prev-accepted';
    liAccept.innerHTML = `
    <span>
      <i class="fa fa-star"></i>
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
