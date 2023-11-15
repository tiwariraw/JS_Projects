const navToggleBtn = document.querySelector('.nav-toggle');
const ulLinks = document.querySelector('.links');

navToggleBtn.addEventListener('click', function(){
    ulLinks.classList.toggle('show-links');
})