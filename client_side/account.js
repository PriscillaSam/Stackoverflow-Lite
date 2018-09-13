const loginDiv = elemById('form-back');
const regForm = elemById('regForm');
const loginForm = elemById('loginForm');
const regBtn = elemById('regBtn');
const loginBtn = elemById('loginBtn');


// const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/signup';
// const regUrl = 'https://so-lite.herokuapp.com/api/v1/auth/login';
const regUrl = 'http://localhost:3000/api/v1/auth/signup';
const loginUrl = 'http://localhost:3000/api/v1/auth/login';


const displayResponse = (response, btn, text) => {
  refreshBtn(btn);
  if (response.status === 'error' || response.errorData) {
    errorResponse(response, loginDiv);
    btnTextDisplay(btn, text);
  } else {
    successResponse(response, loginDiv);
    localStorage.setItem('token', response.token);
    localStorage.setItem('name', response.name);

    btnTextDisplay(btn, 'Redirecting...');
    setTimeout(() => {
      window.location.replace('../html/profile.html');
    }, 2000);
  }
};

regForm.addEventListener('submit', (event) => {
  localStorage.setItem('email', elemById('regEmail').value);
  event.preventDefault();
  refresh(loginDiv);
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
  localStorage.setItem('email', elemById('loginEmail').value);

  event.preventDefault();
  refresh(loginDiv);
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
