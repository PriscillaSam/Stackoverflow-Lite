const inputs = document.getElementsByClassName('form-input');
const signupSection = document.getElementById('signup');
const loginSection = document.getElementById('login');
const signupToggle = document.getElementById('signup-toggle');
const loginToggle = document.getElementById('login-toggle');
const container = document.getElementsByClassName('center')[0];

[...inputs].forEach(i  => {

    i.addEventListener('click', (event) => {
        i.style.padding = '15px 10px 10px';
    });
});
const enlarge = (input) => {

    input.style.padding = '50px';
};

signupToggle.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(() => {
        loginSection.classList.add('hidden','fadeOut');
        signupSection.classList.remove('hidden','fadeOut');
        container.style.margin = '80px auto';
        signupSection.classList.add('fadeIn');

    });
  
});

loginToggle.addEventListener('click', (event) => {
    event.preventDefault();
    signupSection.classList.add('fadeOut');
    setTimeout(() => {
        signupSection.classList.add('hidden');
        container.style.margin = '150px auto';
        loginSection.classList.remove('hidden');
        loginSection.classList.add('fadeIn');

    });

});