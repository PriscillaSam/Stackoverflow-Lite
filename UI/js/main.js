const inputs = document.getElementsByClassName('form-input');


[...inputs].forEach(i  => {

    i.addEventListener('click', (event) => {
        i.style.padding = '15px 10px 10px';
    });
});
const enlarge = (input) => {

    input.style.padding = '50px';
};