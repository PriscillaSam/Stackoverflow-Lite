const elemById = id => document.getElementById(id);
const elemByClass = className => document.getElementsByClassName(className);
const create = elem => document.createElement(elem);

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
