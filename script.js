function formattedDate() {
  let currentDate = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentDate.getDay()];

  let hours = currentDate.getHours();
  let currentHour = hours > 9 ? hours : "0" + hours;

  let minutes = currentDate.getMinutes();
  let currentMinute = minutes > 9 ? minutes : "0" + minutes;

  let formattedDate = document.querySelector("#current-date");
  formattedDate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;
}

function showWeather(response) {
  //console.log(response.data);

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("h1");
  city.innerHTML = searchInput.value;

  let apiKey = "3323502446bafe97fab5698ca4415d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showCurrentWeather(response) {
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = response.data.name;
  let form = document.querySelector("#search-input");
  form.value = ``;

  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  let currentCondition = document.querySelector("#condition");
  currentCondition.innerHTML = response.data.weather[0].main;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let currentWind = document.querySelector("#windSpeed");
  let currentWindSpeed = Math.round(response.data.wind.speed * 3.6);
  currentWind.innerHTML = `Wind: ${currentWindSpeed} km/h`;
}

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "3323502446bafe97fab5698ca4415d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

formattedDate();

let formInput = document.querySelector("form");
formInput.addEventListener("submit", searchCity);

let currentInput = document.querySelector("#current-location");
currentInput.addEventListener("click", showCurrentLocation);
