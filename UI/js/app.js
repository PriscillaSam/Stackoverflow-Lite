const toggle = document.getElementsByClassName('nav-toggle');
const nav = document.getElementById('nav-sm');

[...toggle].forEach(t => {
    
    t.addEventListener('click', (event) => {
        event.preventDefault();

        if(nav.classList.contains('hidden')){
            if(nav.classList.contains('slideOutLeft')){
                nav.classList.remove('slideOutLeft');
            }
           
            nav.classList.add('slideInLeft');            
            nav.classList.remove('hidden');

        }
        else{
            nav.classList.remove('slideInLeft');

            setTimeout(() => {
                nav.classList.add('hidden');
            },1000);
            nav.classList.add('slideOutLeft');

        }
    })
});