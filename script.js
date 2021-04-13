// To-do:
// 1. set unit 
// 2. change background 
// 3. display more details 
// 4. temperature round up/down 
// 5. why are all locations cloudy? how about rainy and sunny? 

const container = document.querySelector('.blur');

const citySearch = document.querySelector('#city'); 
const defaultCity = 'london';
const unitDefault = 'metric';


const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('#search-location');

// const img = document.querySelector('img');
// img.style.width = '500px';

const myH3 = document.createElement('h3');
const temperature = document.createElement('p');
const feelsLike = document.createElement('p');
const condition = document.createElement('p');
const humidity = document.createElement('p');

let city = defaultCity;
let units = unitDefault;
getInfo();
// getGIF();

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchCity();
})

function searchCity() {
    // units = document.querySelector("input[name='units']:checked").value;
    city = citySearch.value;
    // getGIF();
    getInfo();
}

// async function getGIF(condition) {
//     // api_key = 'LAcFuplmZwX3zetwH4BwwJCpFZ4AgrZC'
//     const weather = condition;
//     const obj = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=ZbBJJp4G6oK4CcJCieNCKJH4IcsUkDH9&s=${weather}`, {mode: 'cors'});
//     const gifData = await obj.json();
//     img.src = gifData.data.images.original.url;
// }

async function getInfo() {
    const obj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e551943d6614afa1f2055c3d16f2e930`, {mode: 'cors'});
    const weatherData = await obj.json();
    console.log(weatherData);
    myH3.textContent = weatherData.name;
    temperature.textContent = `${Math.round(weatherData.main.temp)}º`;
    const gifCondition = weatherData['weather'][0]['description'];
    condition.textContent = `Condition: ${gifCondition}`;
    feelsLike.textContent = `Feels like: ${weatherData.main.feels_like}`;
    humidity.textContent = `Humidity: ${weatherData.main.humidity}`;
    // getGIF(gifCondition);
}

container.appendChild(myH3).classList.add('location');
container.appendChild(temperature).classList.add('temperature');
// container.appendChild(condition).classList.add('condition');
// container.appendChild(feelsLike).classList.add('feels-like');
// container.appendChild(humidity).classList.add('humidity');