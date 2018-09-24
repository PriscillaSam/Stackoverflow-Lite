const searchForm = elemById('search-form');
const searchBtn = elemById('search-btn');
const noResult = elemById('no-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  noResult.innerHTML = '';

  const spinner = searchBtn.querySelector('.spinner');
  const btnText = searchBtn.querySelector('.btnText');

  spinner.classList.remove('hidden');
  btnText.innerHTML = '';
  const queryString = elemById('search-input').value;
  const searchUrl = `${baseUrl}/questions/?question=${queryString}`;
  elemById('questions').innerHTML = '';

  fetch(searchUrl, {
    method: 'GET',
  })
    .then(response => response.json())
    .then((response) => {
      refreshBtn(searchBtn);
      btnTextDisplay(searchBtn, '<i class="fa fa-search fa-lg"></i>');
      if (!response.questions) {
        noResult.innerHTML = `
        <div class="box fadeIn">
          <p class="text-success text-center">${response.message}</p>
        </div>
        `;
      } else {
        const { questions } = response;
        questions.forEach((question) => {
          questionCard(question, 'questions');
        });
      }
    });
});
