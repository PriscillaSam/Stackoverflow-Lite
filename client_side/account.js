const getElement = id => document.getElementById(id);

const alertBox = document.getElementsByClassName('alert')[0];
const regForm = getElement('regForm');
const regBtnText = getElement('regBtnText');
const spinner = getElement('spinner');
const alertText = getElement('alertText');

// const regUrl = 'http://localhost:3000/api/v1/auth/signup';
const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/signup';


regForm.addEventListener('submit', (event) => {
  event.preventDefault();

  alertBox.classList.add('hidden');
  alertText.innerHTML = '';
  spinner.classList.remove('hidden');
  regBtnText.innerHTML = 'Please wait...';

  fetch(regUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: getElement('name').value,
      email: getElement('regEmail').value,
      password: getElement('regPassword').value,
      confirmPassword: getElement('confirmPass').value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((body) => {
      spinner.classList.add('hidden');
      regBtnText.innerHTML = 'Register';

      if (body.status === 'error' || body.errorData) {
        alertBox.classList.remove('hidden');
        alertText.innerHTML = body.message || Object
          .values(body.errorData.errorMessages);
      } else {
        alertBox.classList.remove('bg-danger', 'hidden');
        alertBox.classList.add('bg-success');
        alertText.innerHTML = body.message;
        regBtnText.innerHTML = 'Redirecting...';
        localStorage.setItem('token', body.token);

        setTimeout(() => {
          window.location.replace('../html/profile.html');
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
