const API_KEY = "3eefe43796134190ac5b78024cc94137";
const url = "https://newsapi.org/v2/everything?q=";

// When the DOM is loaded, call the fetchNews() function by passing a query("Technology") to search
// Therfore, when the page loads, technology news will be shown
window.addEventListener('DOMContentLoaded', () => fetchNews("Technology"));

// Reload the page when user clicks on the logo
const reload = () => {
    window.location.reload();
}

// async function
const fetchNews = async (query) => {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data.articles);
    bindData(data.articles);  // articles is an array of objects
}

const bindData = (articles) => {
    const cardsContainer = document.getElementById('cards-container');
    const templateCard = document.getElementById('template-card');

    // On every call to bindData() function, make the card container empty to fill it with new data. Otherwise, they would stack up.
    cardsContainer.innerHTML = "";

    articles.forEach(function (article) {
        // Don't show the articles which doesn't contains image
        if (article.urlToImage === null) return;

        // cloning deeply the content inside <template>
        const cardClone = templateCard.content.cloneNode(true);

        // call fillDataInCard() with a cardClone and an article (article is an object which contains details about a single news)
        fillDataInCard(cardClone, article);

        // When the cardClone is filled with data from the news api, append it to the cardsContainer div element
        cardsContainer.appendChild(cardClone);
    });
}

const fillDataInCard = (cardClone, article) => {
    const newsImg = cardClone.getElementById('news-img');
    const newsTitle = cardClone.getElementById('news-title');
    const newsSource = cardClone.getElementById('news-source');
    const newsDesc = cardClone.getElementById('news-desc');

    // convert the date obtained from api into an Asia/Jakarta timezone
    const date = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    });

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    newsSource.innerHTML = `${article.source.name} | ${date}`;

    // open the news url in a new tab when clicked anywhere in the card
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    })
}


let selectedNavItem = null;
const onNavItemClick = (param) => {
    fetchNews(param);

    const navItem = document.querySelector(`.${param}`);

    // If selectedNavItem is not null, then remove the "active" class from the previously selected nav item i.e. (<a> element)
    selectedNavItem?.classList.remove('active');

    // assign the nav item to the variable "selectedNavItem" . So now this nav item becomes the "selectedNavItem"
    selectedNavItem = navItem;

    // Add "active" class to the nav item i.e. currently selected nav item
    navItem.classList.add('active');
}


const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-btn');

// When clicked on search button after entering something in the input field
searchButton.addEventListener('click', () => {
    // searchInput.value provides the input text entered by the user in the search input field
    const query = searchInput.value;

    // If the user presses Search button w/o writing anything in the input field, do nothing
    if (!query) return;

    // call fetchNews() with the user entered input
    fetchNews(query);

    // remove the active class if the user searches something
    selectedNavItem?.classList.remove('active');
    selectedNavItem = null;
});

// clicks the button when any text is typed in the search input field and pressed "Enter" key
searchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})