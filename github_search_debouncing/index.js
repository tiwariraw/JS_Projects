const search = document.getElementById('search');
const card = document.querySelector('.card');
const image = document.getElementById('image');
const name = document.getElementById('name');
const bio = document.getElementById('bio');
const followers = document.getElementById('followers');
const following = document.getElementById('following');

const DEFAULT_IMG_URL = 'https://images.pexels.com/photos/2173872/pexels-photo-2173872.jpeg?auto=compress&cs=tinysrgb&w=600';

let previousSearchValue = ''; // to track the previous search value

const setUserData = (userAvatar, userName, userBio, userFollowers, userFollowing) => {
    image.src = userAvatar;
    name.innerHTML = userName;
    bio.innerHTML = userBio ?? 'Alien';
    followers.innerHTML = `Followers: ${userFollowers}`;
    following.innerHTML = `Following: ${userFollowing}`;
}
const fetchData = async () => {
    try {
        const username = search.value.trim();

        if (username === '' || username === previousSearchValue) {
            return;
        }

        const data = await fetch(`https://api.github.com/users/${username}`);

        if (!data.ok) {
            console.log('Failed to fetch', data.status);
        }

        const json = await data.json();
        console.log(json);

        card.style.display = "block";

        if (json?.message === 'Not Found') {
            setUserData(DEFAULT_IMG_URL, 'Not Found', 'Not Found', 'No followers', 'No following');
        } else {
            setUserData(json?.avatar_url, json?.name, json?.bio, json?.followers, json?.following);
        }

        // Update the previous search value after successful API call
        previousSearchValue = username;
    } catch (err) {
        console.error(err);
    }
}

const debounce = (cb, delay) => {
    let timerId;
    return function (...args) {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}

search.addEventListener('keyup', debounce(fetchData, 500));

// Why I am using previousSearchValue variable:
// -> because after searching for a username in the search input field, when I
// am selecting the entire text to delete and enter a new username, one more api call
// was made.