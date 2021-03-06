const acceptBtns = document.getElementsByClassName('js-accept');
const closeModal = document.getElementsByClassName('cl-modal');


const questionModalToggle = document.getElementsByClassName('js-question');
const questionModal = document.getElementById('question-modal');

const acceptModal = document.getElementById('accept-modal');
const accept = document.getElementById('accept-link');

const updateModal = document.getElementById('update-modal');

const showUpdateModal = () => updateModal.classList.remove('hidden');


[...questionModalToggle].forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (!localStorage.getItem('token')) {
      window.location.replace('./account.html');
    } else {
      questionModal.classList.remove('hidden');
    }
  });
});


[...closeModal].forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (btn.closest('#comments-modal')) {
      const parent = btn.closest('#comments-modal-body');
      parent.classList.remove('fadeIn');

      setTimeout(() => {
        parent.classList.add('fadeOut');
      }, 50);

      setTimeout(() => {
        btn.closest('.modal').classList.add('hidden');
        parent.classList.replace('fadeOut', 'fadeIn');
      }, 500);
    } else {
      const parent = btn.closest('.confirmBox');

      setTimeout(() => {
        parent.classList.add('slideOutDown');
      }, 50);

      parent.classList.remove('slideInUp');
      setTimeout(() => {
        btn.closest('.modal').classList.add('hidden');
        parent.classList.replace('slideOutDown', 'slideInUp');
      }, 400);
    }
  });
});
