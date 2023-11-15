// set inital count value
let count = 0;

const value = document.querySelector('#value');
// returns a Nodelist and we can apply forEach method on the NodeList
const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const classes = event.currentTarget.classList;

        if(classes.contains('decr-btn') === true){
            --count;
        }else if(classes.contains('reset-btn') === true){
            count = 0;
        }else if(classes.contains('incr-btn') === true){
            ++count;
        }

        if(count>0){
            value.style.color = "green";
        }else if (count<0){
            value.style.color = "red";
        }else{
            value.style.color = "black";
        }

        value.textContent = count; 
    })
})