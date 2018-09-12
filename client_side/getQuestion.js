const questionDiv = elemById('question-section');
const id = localStorage.getItem('questionId');

const getUrl = `http://localhost:3000/api/v1/questions/${id}`;
// const url = 'https://so-lite.herokuapp.com/api/v1/questions';

fetch(getUrl, {
  method: 'GET',
})
  .then(response => response.json())
  .then((response) => {
    const body = response.questionObj;
    questionDiv.innerHTML = `
    <h4 class="display-4 text-primary mb-0 fadeIn">
     <i class="fa fa-edit"></i> 
     <strong>${body.question}</strong>
    </h4>            
    <p class="ml-2 mt-0">
      <span class="mr-1">asked ${body.createdat}</span><span>
      <i class="fa fa-user-o fa-fw"></i>${body.name}</span>
      <span class="text-success">
        <i class="fa fa-comments-o fa-fw"></i>${body.answers.length} answers
      </span>
    </p>        
  `;
    body.answers.forEach((answer) => {
      answerCard(answer, body.name);
    });
  });
