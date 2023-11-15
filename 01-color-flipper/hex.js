const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', function(){
    const randomHexColor = getRandomHex();
    document.querySelector('.container').style.backgroundColor = randomHexColor;
    color.textContent = randomHexColor;
})

function getRandomHex(){
    let str = '#';
    for(let i=0;i<6;i++){
       str = str + hex[Math.floor(Math.random()*hex.length)];
    }
    return str;
}