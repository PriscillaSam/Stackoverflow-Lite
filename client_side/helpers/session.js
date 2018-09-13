const logoutBtn = elemByClass('logout-btn');
const userName = elemByClass('user');

if (localStorage.getItem('token')) {
  [...logoutBtn].forEach((btn) => {
    btn.classList.replace('hidden', 'd-inline');
    btn.addEventListener('click', () => {
      localStorage.removeItem('name');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    });
  });
  const name = localStorage.getItem('name');
  [...userName].forEach((user) => {
    user.innerHTML = `
      <a href="profile.html"><i class="fa fa-user-o mr-1"></i>Hi ${name}</a>
  `;
  });
}
