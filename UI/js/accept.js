const confirmBox = document.getElementById('accept-box');
const acceptBtns = document.getElementsByClassName('js-accept');
const closeModal = document.getElementsByClassName('cl-modal');
const confirmBtn = document.getElementById('confirm');

const questionModalToggle = document.getElementsByClassName('js-question');
const questionModal = document.getElementById('question-modal');

const acceptModal = document.getElementById('accept-modal');
const accept = document.getElementById('accept-link');


[...questionModalToggle].forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
    if (!localStorage.getItem('token')) {
        window.location.replace('../html/account.html');
    } else {
        questionModal.classList.remove('hidden'); 
    }
  
});
});

const acceptAnswer = (event) => {
    event.preventDefault();
    acceptModal.classList.remove('hidden');
};


[...closeModal].forEach(btn => {
    btn.addEventListener('click', (event) => {
        const parent = btn.closest('.confirmBox');
        event.preventDefault();
        setTimeout(() => {
            parent.classList.add('slideOutDown');
        }, 50);
       
        parent.classList.remove('slideInUp');
        setTimeout(() => {
            btn.closest('.modal').classList.add('hidden');
            parent.classList.replace('slideOutDown', 'slideInUp');
        }, 400);
    });
});

confirmBtn.addEventListener('click', (event) => {        
    event.preventDefault();
    confirmBox.classList.add('slideOutDown');

    setTimeout(() => {
        setTimeout(() => {
            confirmBox.closest('.modal').classList.add('hidden');
            confirmBox.classList.remove('slideOutDown');
        },500);
        accept.innerHTML = '<li><span class="badge badge-dark text-success">accepted answer</span></li>';

    });
});