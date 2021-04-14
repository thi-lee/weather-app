// To-do:
// 1. set unit 
// 3. display more details 
// 5. why are all locations cloudy? how about rainy and sunny? 

const container = document.querySelector('.blur');

const citySearch = document.querySelector('#city'); 
const defaultCity = 'london';
const unitDefault = 'metric';


const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('#search-location');

// const img = document.querySelector('img');
// img.style.width = '500px';

const main = document.createElement('div')
container.appendChild(main).classList.add('main');

const myH3 = document.createElement('h3');
const temperature = document.createElement('p');

const feelsLike = document.createElement('p');
const condition = document.createElement('p');
const humidity = document.createElement('p');

let city = defaultCity;
let units = unitDefault;
getInfo();
addInfo();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchCity();
})

function searchCity() {
    // units = document.querySelector("input[name='units']:checked").value;
    city = citySearch.value;
    getInfo();
}

async function getInfo() {
    const obj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e551943d6614afa1f2055c3d16f2e930`, {mode: 'cors'});
    const weatherData = await obj.json();
    console.log(weatherData);

    myH3.textContent = weatherData.name;
    temperature.textContent = `${Math.round(weatherData.main.temp)}º`;
    // const gifCondition = weatherData['weather'][0]['description'];
    // condition.textContent = `Condition: ${gifCondition}`;
    // feelsLike.textContent = `Feels like: ${weatherData.main.feels_like}`;
    // humidity.textContent = `Humidity: ${weatherData.main.humidity}`;
}

main.appendChild(myH3).classList.add('location');
main.appendChild(temperature).classList.add('temperature');

function addInfo() {
    const addInfo = document.createElement('span');
    container.appendChild(addInfo).classList.add('add-info');

    const nav = document.createElement('nav');
    const navList = document.createElement('ul');
    nav.appendChild(navList);
    const tabs = ["Hourly", "Daily", "Details", "Precipitation"];
    for (i = 0; i < tabs.length; i++) {
        const navTab = document.createElement('li');
        navTab.textContent = tabs[i];
        navList.appendChild(navTab);
    }
    addInfo.appendChild(nav).classList.add('nav');

    // addInfo.appendChild(condition).classList.add('condition');
    // addInfo.appendChild(feelsLike).classList.add('feels-like');
    // addInfo.appendChild(humidity).classList.add('humidity');
}

// when <li></li> is clicked, display click style
// display additional info 

function displayAddInfo() {
    const displayInfo = document.createElement('span');
    displayInfo.textContent = 'Hello';
    addInfo.appendChild(displayInfo);
}