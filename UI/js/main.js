const inputs = document.getElementsByClassName('form-input');
const signupSection = document.getElementById('signup');
const loginSection = document.getElementById('login');
const signupToggle = document.getElementById('signup-toggle');
const loginToggle = document.getElementById('login-toggle');
const container = document.getElementsByClassName('center')[0];

[...inputs].forEach(i  => {

    i.addEventListener('focus', (event) => {
        i.style.padding = '20px 10px 10px';
    });
    
    i.addEventListener('blur', (event) => {
        i.style.padding = '10px';
    });
});
const enlarge = (input) => {

    input.style.padding = '50px';
};

signupToggle.addEventListener('click', (event) => {
    event.preventDefault();
    refresh();
    setTimeout(() => {
        loginSection.classList.add('hidden','fadeOut');
        signupSection.classList.remove('hidden','fadeOut');
        container.style.margin = '90px auto';
        signupSection.classList.add('fadeIn');

    });
  
});

loginToggle.addEventListener('click', (event) => {
    refresh();
    event.preventDefault();
    signupSection.classList.add('fadeOut');
    setTimeout(() => {
        signupSection.classList.add('hidden');
        container.style.margin = '150px auto';
        loginSection.classList.remove('hidden');
        loginSection.classList.add('fadeIn');

    });

});