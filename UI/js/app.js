const toggle = document.getElementsByClassName('nav-toggle');
const nav = document.getElementById('nav-sm');

[...toggle].forEach(t => {
    
    t.addEventListener('click', () => {
        if(nav.classList.contains('hidden')){
            nav.classList.remove('hidden');

        }
        else{
            nav.classList.add('hidden');
        }
    })
});