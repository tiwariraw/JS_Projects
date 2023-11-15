const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');
const container = document.querySelector('.container');

btn.addEventListener('click', function(){
    const randomIndex = Math.floor(Math.random()*colors.length);
    container.style.backgroundColor = colors[randomIndex];
    color.textContent = colors[randomIndex];
})
