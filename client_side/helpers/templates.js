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
  const liUser = create('li');
  const container = create('div');

  h3.classList.add('mb-0', 'mt-0', 'display-3');

  a.setAttribute('href', 'question.html');
  a.setAttribute('data-id', question.id);
  a.classList.add('text-success');
  a.innerHTML = question.question;
  a.onclick = () => getId(a);

  h3.appendChild(a);

  liTime.innerHTML = question.createdat;
  ul.appendChild(liTime);

  liAns.innerHTML = `<i class="fa fa-comments-o fa-fw"></i>${question.answers}`;
  ul.appendChild(liAns);

  liUser.innerHTML = `<i class="fa fa-user-o fa-fw"></i>${question.name}`;
  ul.appendChild(liUser);

  container.setAttribute('class', 'box');

  container.appendChild(h3);
  container.appendChild(ul);

  section.appendChild(container);
};


const answerCard = (answer, questionUser) => {
  const answers = elemById('answers');
  const p = create('p');
  const a = create('a');
  const h3 = create('h3');
  const ul = create('ul');
  const liTime = create('li');
  const liUpvotes = create('li');
  const aUpvote = create('a');
  const container = create('div');

  const liDownvotes = create('li');
  const aDownvote = create('a');

  const liAccept = create('li');

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

  liTime.innerHTML = `answered ${answer.createdat}`;
  ul.appendChild(liTime);

  aUpvote.setAttribute('href', '');
  aUpvote.setAttribute('title', 'upvote answer');
  aUpvote.setAttribute('data-id', answer.id);
  aUpvote.innerHTML = '<i class="fa fa-thumbs-o-up fa-fw"></i>';

  liUpvotes.innerHTML = answer.upvotes;
  liUpvotes.insertBefore(aUpvote, liUpvotes.childNodes[0]);

  aDownvote.setAttribute('href', '');
  aDownvote.setAttribute('title', 'downvote answer');
  aDownvote.setAttribute('data-id', answer.id);
  aDownvote.innerHTML = '<i class="fa fa-thumbs-o-down fa-fw"></i>';

  liDownvotes.innerHTML = answer.downvotes;
  liDownvotes.insertBefore(aDownvote, liDownvotes.childNodes[0]);

  ul.appendChild(liTime);
  ul.appendChild(liUpvotes);
  ul.appendChild(liDownvotes);

  const user = localStorage.getItem('name');

  if (answer.isaccepted) {
    liAccept.innerHTML = `
    <span class="badge badge-dark text-success">accepted answer</span>`;
    ul.appendChild(liAccept);
  } else if (user === questionUser && !answer.isaccepted) {
    const aAccept = create('a');

    aAccept.setAttribute('href', '');
    aAccept.setAttribute('class', 'js-accept');
    aAccept.innerHTML = '<i class="fa fa-square-o fa-fw"></i>';
    aAccept.onclick = event => acceptAnswer(event);

    liAccept.innerHTML = 'accept this answer';
    liAccept.insertBefore(aAccept, liAccept.childNodes[0]);

    ul.appendChild(liAccept);
  }

  container.setAttribute('class', 'box');
  container.appendChild(p);
  container.appendChild(h3);
  container.appendChild(ul);

  answers.appendChild(container);
};
