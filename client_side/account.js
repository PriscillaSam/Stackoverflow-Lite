const alertBox = elemByClass('alert')[0];
const regForm = elemById('regForm');
const loginForm = elemById('loginForm');
const alertText = elemById('alertText');
const regBtn = elemById('regBtn');
const loginBtn = elemById('loginBtn');

// const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/signup';
// const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/login';
const regUrl = 'http://localhost:3000/api/v1/auth/signup';
const loginUrl = 'http://localhost:3000/api/v1/auth/login';

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
  const btnText = btn.querySelector('.btnText');
  btnText.innerHTML = '';
};

const btnTextDisplay = (btn, text) => {
  const btnText = btn.querySelector('.btnText');
  btnText.innerHTML = text;
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
    localStorage.setItem('name', response.name);

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
      name: elemById('name').value,
      email: elemById('regEmail').value,
      password: elemById('regPassword').value,
      confirmPassword: elemById('confirmPass').value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then((body) => {
      displayResponse(body, regBtn, 'Create Account');
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
      email: elemById('loginEmail').value,
      password: elemById('loginPassword').value,
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
