//get modal
const modal = document.getElementsByClassName('modal')[0];
const confirmBox = document.getElementById('confirmBox');
const delBtn = document.getElementsByClassName('js-accept');
const closeModal = document.getElementsByClassName('cl-modal');
const accept = document.getElementById('accept-link');

const confirmBtn = document.getElementById('confirm');

[...delBtn].forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('hidden');
    });
});

const toggleModal = () => {
  
    if(modal.classList.contains('hidden')){
        modal.classList.remove('hidden');
        setTimeout(() => {
            confirmBox.classList.add('slideOutDown');
        });

        confirmBox.classList.remove('slideInUp');            
    }

    if(!modal.classList.contains('hidden')){
        confirmBox.classList.add('slideOutDown');

        setTimeout(() => {
            modal.classList.add('hidden');
            confirmBox.classList.remove('slideOutDown');

        },500);

    }

};

[...closeModal].forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        toggleModal();
    });
});

confirmBtn.addEventListener('click', (event) => {        
    event.preventDefault();

    confirmBox.classList.add('slideOutDown');

    setTimeout(() => {
        confirmBox.classList.add('hidden');

        setTimeout(() => {
            modal.classList.add('hidden');
            confirmBox.classList.remove('hidden');
            confirmBox.classList.remove('slideOutDown');

        },500);
        accept.innerHTML = '<li><span class="badge badge-dark text-success">accepted answer</span></li>';

    });
});