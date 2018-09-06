const getElement = id => document.getElementById(id);

const alertBox = document.getElementsByClassName('alert')[0];
const regForm = getElement('regForm');
const loginForm = getElement('loginForm');
const alertText = getElement('alertText');
const regBtn = getElement('regBtn');
const loginBtn = getElement('loginBtn');

const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/signup';
const loginUrl = 'https://so-lite.herokuapp.com/api/v1/auth/login';

const refresh = () => {
  alertBox.classList.add('hidden', 'bg-danger');
  alertText.innerHTML = '';
};

const btnActivity = (btn) => {
  const spinner = btn.querySelector('.spinner');
  const btnText = btn.querySelector('.btnText');

  spinner.classList.remove('hidden');
  btnText.innerHTML = 'Please wait...';
};

const refreshBtn = (btn) => {
  btn.querySelector('.spinner').classList.add('hidden');
  btn.querySelector('.btnText').innerHTML = '';
};

const btnTextDisplay = (btn, text) => {
  btn.querySelector('.btnText').innerHTML = text;
};

const displayResponse = (response, btn, text) => {
  refreshBtn(btn);
  if (response.status === 'error' || response.errorData) {
    alertBox.classList.remove('hidden');
    alertText.innerHTML = response.message || Object
      .values(response.errorData.errorMessages);
    btnTextDisplay(btn, text);
  } else {
    alertBox.classList.remove('bg-danger', 'hidden');
    alertBox.classList.add('bg-success');
    alertText.innerHTML = response.message;
    localStorage.setItem('token', response.token);
    btnTextDisplay(btn, 'Redirecting...');
    setTimeout(() => {
      window.location.replace('../html/profile.html');
    }, 2000);
  }
};

regForm.addEventListener('submit', (event) => {
  event.preventDefault();
  refresh();
  btnActivity(regBtn);

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
      displayResponse(body, regBtn, 'Register');
    })
    .catch((error) => {
      console.log(error);
    });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  refresh();
  btnActivity(loginBtn);

  fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({
      email: getElement('loginEmail').value,
      password: getElement('loginPassword').value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((body) => {
      displayResponse(body, loginBtn, 'Welcome');
    })
    .catch((error) => {
      console.log(error);
    });
});
