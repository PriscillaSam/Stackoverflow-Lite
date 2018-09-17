const elemById = id => document.getElementById(id);
const elemByClass = className => document.getElementsByClassName(className);
const create = elem => document.createElement(elem);


const btnActivity = (btn) => {
  const spinner = btn.querySelector('.spinner');
  const btnText = btn.querySelector('.btnText');

  spinner.classList.remove('hidden');
  btnText.innerHTML = 'Please wait...';
};

const refreshBtn = (btn) => {
  btn.querySelector('.spinner').classList.add('hidden');
  const btnText = btn.querySelector('.btnText');
  btnText.innerHTML = '';
};

const btnTextDisplay = (btn, text) => {
  const btnText = btn.querySelector('.btnText');
  btnText.innerHTML = text;
};

const getAlertBox = (div) => {
  const alertBox = div.querySelector('.alert');
  return alertBox;
};

const getAlertText = (div) => {
  const alertText = div.querySelector('.alertText');
  return alertText;
};
const refresh = (div) => {
  getAlertBox(div).classList.add('hidden', 'bg-danger');
  getAlertText(div).innerHTML = '';
};

const errorResponse = (response, div) => {
  getAlertBox(div).classList.remove('hidden');
  getAlertText(div).innerHTML = response.message || Object
    .values(response.errorData.errorMessages);
};

const successResponse = (response, div) => {
  const alertBox = getAlertBox(div);
  alertBox.classList.remove('bg-danger', 'hidden');
  alertBox.classList.add('bg-success');
  getAlertText(div).innerHTML = response.message;
};

/**
 * Get the items from an array
 * @param {Array} array Array element
 * @param {Number} count Number of array content to return
 * @returns {Array} Array containing items
 */
const getItems = (array, count) => {
  if (count === 'all') {
    return array;
  }

  return array.splice(0, count);
};

/**
 * Create question card content and add it on the page
 * @param {Array} questions Array of questions
 * @param {Number} count Number of questions to display
 * @param {Element} elem Html element to append question card to
 * @returns {*} Nothing
 */
const createContent = (questions, count, elem) => {
  getItems(questions, count).forEach((question) => {
    questionCard(question, elem);
  });
};

const getQuestions = (urL, count, elem) => {
  fetch(urL, {
    method: 'GET',
  })
    .then(response => response.json())
    .then((body) => {
      const { questions } = body;
      createContent(questions, count, elem);
    });
};
