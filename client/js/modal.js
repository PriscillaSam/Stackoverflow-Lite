// get modal
const modal = document.getElementsByClassName('modal')[0];
const confirmBox = document.getElementById('confirmBox');
const delBtn = document.getElementsByClassName('js-delete');
const closeModal = document.getElementsByClassName('cl-modal');

const deleteNotif = document.getElementById('notif');
const confirmBtn = document.getElementById('confirm');

[...delBtn].forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    modal.classList.remove('hidden');
  });
});

const toggleModal = () => {
  if (modal.classList.contains('hidden')) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      confirmBox.classList.add('slideOutDown');
    });

    confirmBox.classList.remove('slideInUp');
  }

  if (!modal.classList.contains('hidden')) {
    confirmBox.classList.add('slideOutDown');

    setTimeout(() => {
      modal.classList.add('hidden');
      confirmBox.classList.remove('slideOutDown');
    }, 500);
  }
};

[...closeModal].forEach((btn) => {
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
    deleteConfirmed();
    setTimeout(() => {
      modal.classList.add('hidden');
      confirmBox.classList.remove('hidden');
      deleteNotif.classList.add('hidden');
      confirmBox.classList.remove('slideOutDown');
    }, 1200);
  });
});
