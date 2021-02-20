const COORDS = "coords";
const API_KEY = "98f62eaf30f2ef41801860250f56ad33";
const weather = document.querySelector(".js-weather");

function getWeather(lat, log) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerHTML = `${temp}°C  @${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleError() {
  console.log("Cant load geo location.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude)``;
  }
}

function init() {
  loadCoords();
}

init();
