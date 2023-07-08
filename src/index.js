// use this alert later if needed. if not, delete it.
// alert(
//  "Hi! This page uses the OpenWeatherMap geolocation API, since the Google geolocation API is blocked in the creator's country (Iran). This ensures that the code will run in Chrome inside as well as outside Iran. Thank you!");

///////////////////////////////////////////////
///////////// Current Date & Time ////////////
/////////////////////////////////////////////
// Display the current date and time using JavaScript.
let now = new Date();

function formatTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let weekdayToday = document.querySelector("#today-is");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
weekdayToday.innerHTML = `${day}`;

let timeToday = document.querySelector("#current-time");
timeToday.innerHTML = formatTime(now);

///////////////////////////////////////////////
////////// API Search & Geolocation //////////
/////////////////////////////////////////////
// Use API calls to find i) searched cities in search engine, and ii) current location via geolocation

// i) Use search engine to find a city and display its weather (including precipitation, humidity and wind)

function showTemperature(response) {
  console.log(response); // this line needs to go once things are ready to run

  let todayIcon = document.querySelector("#todays-icon");
  todayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  todayIcon.setAttribute("alt", `${response.data.weather[0].description}`);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#today-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let descriptionNow = response.data.weather[0].description;
  document.querySelector(
    "#current-description"
  ).innerHTML = `${descriptionNow}`;
  let humidityNow = response.data.main.humidity;
  document.querySelector("#current-humidity").innerHTML = `${humidityNow} %`;
  let windNow = Math.round(response.data.wind.speed);
  document.querySelector("#current-wind-speed").innerHTML = `${windNow} km/h`;
}

function submitForm(event) {
  event.preventDefault();
  let apiKey = "18939b60119d11659d9614b275d1b21b";
  let city = document.querySelector("#search-input-bar");
  city = city.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", submitForm);

// ii) Search for current location's weather using geolocation

function getPosition(position) {
  let apiKey = "18939b60119d11659d9614b275d1b21b";
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&units=metric&appid=${apiKey}`;
  axios.get(geoURL).then(showTemperature);
}

function getUserPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let currentLocationLink = document.querySelector("#current-location-link");
currentLocationLink.addEventListener("click", getUserPosition);

// iii) // we don't want to show dummy data on load, so we'll call loadDefaultCity once on load
function loadDefaultCity(city) {
  let apiKey = "18939b60119d11659d9614b275d1b21b";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}
loadDefaultCity("Tabriz");

///////////////////////////////////////////////
//////////////// Search Engine ///////////////
/////////////////////////////////////////////
// Add a search engine, when searching for a city (i.e. Paris),
// Display the city name on the page after the user submits the form.

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input-bar");
  let inputFirstCharacter = searchInput.value.charAt(0);
  inputFirstCharacter = inputFirstCharacter.toUpperCase();
  searchInput.value = inputFirstCharacter + searchInput.value.slice(1);
  console.log(searchInput.value); // ...quite useful as a search history substitute, for now

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = `Looking for city...`;
    alert("Please type a city");
  }
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchCity);

///////////////////////////////////////////////
/////////// Temperature Conversion ///////////
/////////////////////////////////////////////
// Display a temperature (i.e 19) in Celsius and add a link to convert it to Fahrenheit.
// credit to Tetiana Zorenko's solution for successful conversions using Number()

function convertToFahrenheit(event) {
  event.preventDefault();
  let todayTemperature = document.querySelector("#today-temperature");
  let todayTemp = todayTemperature.innerHTML;
  todayTemp = Number(todayTemp);
  todayTemperature.innerHTML = Math.round((todayTemp * 9) / 5 + 32);

  fahrenheitLink.style.textDecoration = "none";
  fahrenheitLink.style.fontWeight = "bold";
  fahrenheitLink.style.fontSize = "14px";
  celsiusLink.style.fontSize = "10px";
  celsiusLink.style.fontWeight = "normal";
}

// When clicking on Celsius, it should convert it back to Celsius.

function convertToCelsius(event) {
  event.preventDefault();
  let todayTemperature = document.querySelector("#today-temperature");
  let todayTemp = todayTemperature.innerHTML;
  todayTemp = Number(todayTemp);
  todayTemperature.innerHTML = Math.round(((todayTemp - 32) * 5) / 9);

  celsiusLink.style.textDecoration = "none";
  celsiusLink.style.fontWeight = "bold";
  celsiusLink.style.fontSize = "14px";
  fahrenheitLink.style.fontSize = "10px";
  fahrenheitLink.style.fontWeight = "normal";
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

//////////////// End index.js ////////////////
