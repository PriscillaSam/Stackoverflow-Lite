const inputs = document.getElementsByClassName('form-input');
const signupSection = document.getElementById('signup');
const loginSection = document.getElementById('login');
const signupToggle = document.getElementById('signup-toggle');
const loginToggle = document.getElementById('login-toggle');
const container = document.getElementsByClassName('center')[0];


[...inputs].forEach((i) => {
  i.addEventListener('focus', () => {
    i.style.padding = '20px 10px 10px';
  });

  i.addEventListener('blur', () => {
    i.style.padding = '10px';
  });
});

signupToggle.addEventListener('click', (event) => {
  event.preventDefault();
  refresh(container);
  setTimeout(() => {
    loginSection.classList.add('hidden', 'fadeOut');
    signupSection.classList.remove('hidden', 'fadeOut');
    container.style.margin = '70px auto';
    signupSection.classList.add('fadeIn');
  });
});

loginToggle.addEventListener('click', (event) => {
  refresh(container);
  event.preventDefault();
  signupSection.classList.add('fadeOut');
  setTimeout(() => {
    signupSection.classList.add('hidden');
    container.style.margin = '100px auto';
    loginSection.classList.remove('hidden');
    loginSection.classList.add('fadeIn');
  });
});
