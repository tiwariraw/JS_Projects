const name = document.querySelector(".name");
const iconImg = document.querySelector(".icon-img");
const temp = document.querySelector(".temp");
const tempMin = document.querySelector(".temp-min");
const tempMax = document.querySelector(".temp-max");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const btnGetWeather = document.querySelector('.btn-get-weather');
const btnCurLocation = document.querySelector('.btn-cur-location');
const userLocation = document.querySelector('.user-location');

const fetchWeather = async (location) => {
    try {
        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=99252f402ed30347a65071e6b5f6b584`
        );
        // console.log(data);

        if (!data.ok) {
            throw new Error(data?.statusText);
        }

        const json = await data.json();
        showWeather(json);
        // console.log(json);

        if (json?.cod === '404') {
            console.log(json?.message);
            fetchWeather('Bengaluru'); // instead of hard coding 'Bengaluru', get the user current location from geolocation API
        }
    } catch (err) {
        console.error(err.message);
    }
};

function showWeather(json) {
    const id = json?.weather[0]?.id;
    let icon = '';

    switch (id) {
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
            icon = "11d";
            break;

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            icon = "09d";
            break;

        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
            icon = "10d";
            break;

        case 511:
            icon = "13d";
            break;

        case 520:
        case 521:
        case 522:
        case 531:
            icon = "09d";
            break;

        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 613:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            icon = "13d";
            break;
        case 701:
        case 701:
        case 711:
        case 721:
        case 731:
        case 741:
        case 751:
        case 761:
        case 762:
        case 771:
        case 781:
            icon = "50d";
            break;

        case 800:
            icon = "01d";
            break;

        case 801:
            icon = "02d";
            break;

        case 802:
            icon = "02d";
            break;

        case 803:
        case 804:
            icon = "04d";
            break;
    }

    name.innerHTML = json?.name;
    iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    temp.innerHTML = `<b>Temperature:</b> ${json?.main?.temp} °C`;
    tempMin.innerHTML = `<b>Min Temp:</b> ${json?.main?.temp_min} °C`;
    tempMax.innerHTML = `<b>Max Temp:</b> ${json?.main?.temp_max} °C`;
    document.querySelector(".weather-main").innerHTML = json?.weather[0]?.main;
    pressure.innerHTML = `<b>Pressure</b>: ${json?.main?.pressure}`;
    humidity.innerHTML = `<b>Humidity</b>: ${json?.main?.humidity}`;

    userLocation.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    let newLocation = '';

    btnGetWeather.addEventListener("click", () => {
        fetchWeather(newLocation);
    });

    document.querySelector(".search").addEventListener("input", (event) => {
        newLocation = event.target.value;
    });

    // clicks the button when the user hits enter key in input field 
    document.querySelector('.search').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            btnGetWeather.click();
        }
    });

    fetchWeather('Bengaluru');
})

// get user current location
btnCurLocation.addEventListener('click', () => {
    if (navigator.geolocation) {
        // console.log(navigator);
        // console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(sucsessCallback, errorCallback);
    } else {
        userLocation.innerHTML = 'Geolocation is not supported by this browser.'
    }

    function sucsessCallback(position) {
        // console.log(position.coords);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude
        userLocation.innerHTML = `<b>Latitude:</b> ${latitude} </br></br> <b>Longitude:</b> ${longitude}`;

        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        const getCityFromLatLong = async () => {
            const data = await fetch(url);
            const json = await data.json();
            // console.log(json);
            // console.log(json?.city);
            fetchWeather(json?.city);

        }

        getCityFromLatLong();
    }

    function errorCallback(error) {
        console.log(error);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                userLocation.innerHTML = error.message;
                break;

            case error.POSITION_UNAVAILABLE:
                userLocation.innerHTML = error.message;
                break;

            case error.TIMEOUT:
                userLocation.innerHTML = error.message;
                break;

            case error.UNKNOWN_ERROR:
                userLocation.innerHTML = 'An unknown error occured.';
                break;
        }
    }
})