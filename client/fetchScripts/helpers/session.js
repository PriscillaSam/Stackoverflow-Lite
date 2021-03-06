const logoutBtn = elemByClass('logout-btn');
const userName = elemByClass('user');

if (localStorage.getItem('token')) {
  [...logoutBtn].forEach((btn) => {
    btn.classList.replace('hidden', 'd-inline');
    btn.addEventListener('click', () => {
      Object.keys(localStorage).forEach((key) => {
        if (key !== 'questionId') {
          localStorage.removeItem(key);
        }
      });
    });
  });
  const name = localStorage.getItem('name');
  [...userName].forEach((user) => {
    user.innerHTML = `
      <a href="profile.html"><i class="far fa-user mr-1"></i>Hi ${name}</a>
  `;
  });
}
