// local reviews data (an array of objects)
const reviews = [
  {
    name: 'alex mccarthy',
    profession: 'web developer',
    image: 'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80',
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    name: 'rahul bashyal',
    profession: 'web designer',
    image: 'https://images.unsplash.com/photo-1598096969068-7f52cac10c83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    name: 'amahle arno',
    profession: 'intern',
    image: 'https://images.unsplash.com/photo-1613005798967-632017e477c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    text: 'Sriracha literally hola howdie wallah flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated hola howdie wallah charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    name: 'christian buehner',
    profession: 'the boss',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
  },
];

const img = document.getElementById('person-img');
const author = document.getElementById('author');
const job = document.getElementById('job');
const info = document.getElementById('info');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const randomBtn = document.querySelector('.random-btn');

// set starting item
let currentindex = 0;

// load initial item
window.addEventListener('DOMContentLoaded', () => {
  showPerson(currentindex);
})

// show person based on item
function showPerson(currIndex){
  const item = reviews.at(currIndex);
  img.src = item.image;
  author.textContent = item.name;
  job.textContent = item.profession;
  info.textContent = item.text;
}

// show next person
nextBtn.addEventListener('click', () => {
  currentindex++;
  if(currentindex > reviews.length-1){
    currentindex = 0;
  }
  showPerson(currentindex);
})

// show previous person
prevBtn.addEventListener('click', () => {
  --currentindex;
  if(currentindex < 0){
    currentindex = reviews.length-1;
  }
  showPerson(currentindex);

})

// get a random index
function getRandomIndex(){
  return Math.floor(Math.random()*reviews.length);
}

// show random person
randomBtn.addEventListener('click', () => {
  const randomIndex = getRandomIndex();
  showPerson(randomIndex);
})
