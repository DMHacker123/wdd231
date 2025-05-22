// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// Replace YOUR_API_KEY_HERE with your actual OpenWeatherMap API key

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Trier,de&appid=2d8d34e548dc6953b6e05ec58a45d426&units=metric';

// Fetch weather data
async function fetchWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    currentTemp.textContent = 'Unable to load data';
    console.error(error);
  }
}

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        // displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();

  function displayWeather(data) {
    const temp = data.main.temp.toFixed(1);
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const description = data.weather[0].description;
  
    currentTemp.textContent = `${temp} °C`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', description);
    captionDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  }
  

// Call the function
fetchWeather();
