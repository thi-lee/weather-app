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

const main = document.querySelector('.main');
const leftMain = document.querySelector('.left-main');
const rightMain = document.querySelector('.right-main');

const myH3 = document.createElement('p');
const date = document.createElement('p');
const mainIcon = document.createElement('p');
const condition = document.createElement('p');

const temperature = document.createElement('p');
const minMax = document.createElement('p');

leftMain.appendChild(myH3).classList.add('location');
leftMain.appendChild(date).classList.add('date');
leftMain.appendChild(mainIcon).classList.add('main-icon');
leftMain.appendChild(condition).classList.add('condition');

rightMain.appendChild(temperature).classList.add('temperature');
rightMain.appendChild(minMax).classList.add('min-max');

const addInfo = document.createElement('span');
container.appendChild(addInfo).classList.add('add-info');
const nav = document.createElement('nav');
const navList = document.createElement('ul');
nav.appendChild(navList);

let city = defaultCity;
let units = unitDefault;
let d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date.innerHTML = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
mainIcon.innerHTML = '<i class="wi wi-cloudy"></i>';
getInfo();
infoSpan();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    city = citySearch.value;
    getInfo();
})

async function getInfo() {
    const obj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e551943d6614afa1f2055c3d16f2e930`, {mode: 'cors'});
    if (obj.status != 404) {
        const weatherData = await obj.json();
        console.log(weatherData);

        myH3.textContent = weatherData.name ;
        temperature.textContent = `${Math.round(weatherData.main.temp)}º`;
        condition.textContent = `${weatherData['weather'][0]['description']}`;
        condition.style.textTransform = 'capitalize';

        minMax.textContent = `${Math.round(weatherData.main.temp_min)}º / ${Math.round(weatherData.main.temp_max)}º`;
    } else {
        const notFound = document.querySelector('.search-error')
        notFound.textContent = 'No city match. Please try again!';
    }

    return {};
}

function infoSpan() {
    addInfo.innerHTML = (
        `<ul class="nav">
            <li class="default" value="feels_like">Feels like</li>
            <li value="humidity">Humidity</li>
            <li value="pressure">Pressure</li>
            <li value="precipitation">Precipitation</li>
        </ul>`
    )
}

function displayAddInfo() {
    const displayInfo = document.createElement('span');
    addInfo.appendChild(displayInfo).classList.add('display-add-info');
}

const navTabs = document.querySelectorAll('li');
navTabs.forEach(function(nav) {
    if (document.querySelector('.highlighted') === null) {
        console.log('hello');
        document.querySelector('.default').classList.add('highlighted');
    }
    nav.addEventListener('click', function() {
        if (nav.classList != 'highlighted') { 
            if (document.querySelector('.highlighted') != null) {
                document.querySelector('.highlighted').classList.remove('highlighted');
            }
            nav.classList.add('highlighted');
        }
        nav.classList.add('highlighted');
        displayAddInfo();
    })
});