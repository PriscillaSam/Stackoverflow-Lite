const url = 'https://so-lite.herokuapp.com/api/v1/questions';

const cardContent = question => `
  <h3 class="mb-0 mt-0 display-3">
    <a href="question.html" class="text-success">${question.question}</a>
  </h3>
  <ul>
    <li>${question.createdat}</li>
    <li><i class="fa fa-comments-o fa-fw"></i>${question.answers}</li>
    <li><i class="fa fa-user-o fa-fw"></i>${question.name}</li>
  </ul>
`;

getQuestions(url, 'all', 'questions');
