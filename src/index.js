import "./style.css";
import { addCard } from "./card-DOM";
import { hideCardSearch } from "./card-search-bar";

let tempUnits = "imperial";

const updateWeather = ((cardID) => {
  const searchBar = document.getElementById(`location-search-${cardID}`);
  const searchLocation = searchBar.value;
  return prepCoordinates(searchLocation);
});

function prepCoordinates(string) {
  const newString = string.replace(" ", "%20");
  return newString;
}

function setWeatherDisplay(cardID) {
  const place = updateWeather(cardID);
  fetch(`http://api.positionstack.com/v1/forward?access_key=ec78caf810296050ad14e7afa8074f9b&query=${place}&sun_module=1`, { mode: "cors" })
    .then((response) => response.json())
    .then((response) => packageCoordinates(cardID, response))
    .then((response) => {
      getWeather(cardID, response);
      getTimeZone(cardID, response);
    });
}

const packageCoordinates = ((cardID, cityLatLon) => {
  document.getElementById(`location${cardID}`).innerText = cityLatLon.data[0].name;
  const testLat = cityLatLon.data[0].latitude;
  const testLon = cityLatLon.data[0].longitude;

  const coordinates = [testLat, testLon];
  console.log(coordinates);
  return coordinates;
});

function getWeather(cardID, coordinates) {
  const lat = coordinates[0];
  const lon = coordinates[1];

  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${tempUnits}&APPID=058a9e7cbb93b891a6bae74af2ac0357`, { mode: "cors" })
    .then((response) => response.json())
    .then((response) => {
      displayWeather(cardID, response);
      setBackground(cardID, response);
    });
}

const setBackground = ((cardID, response) => {
  const conditions = response.weather[0].icon;
  console.log(conditions);

  const card = document.getElementById(`card-wrapper-${cardID}`);
  if (conditions === "11d") {
    card.setAttribute("class", "card-wrapper storm");
  } else if (conditions === "09d" || conditions === "10d" || conditions === "9n" || conditions === "10n") {
    card.setAttribute("class", "card-wrapper rain");
  } else if (conditions === "13d") {
    card.setAttribute("class", "card-wrapper snow");
  } else if (conditions === "01d") {
    card.setAttribute("class", "card-wrapper clear-day");
  } else if (conditions === "01n") {
    card.setAttribute("class", "card-wrapper clear-night");
  } else if (conditions === "02d" || conditions === "03d" || conditions === "04d") {
    card.setAttribute("class", "card-wrapper cloud-day");
  } else if (conditions === "02n" || conditions === "03n" || conditions === "04n") {
    card.setAttribute("class", "card-wrapper cloud-night");
  }
});

const displayWeather = ((cardID, weatherData) => {
  document.getElementById(`temp${cardID}`).innerText = `${Math.round(weatherData.main.temp)} °`;
  document.getElementById(`high${cardID}`).innerText = `${Math.round(weatherData.main.temp_max)} °`;
  document.getElementById(`low${cardID}`).innerText = `${Math.round(weatherData.main.temp_min)} ° / `;
  document.getElementById(`forecast${cardID}`).innerText = weatherData.weather[0].description;

  document.getElementById(`divider-div${cardID}`).setAttribute("class", "divider-div-show");
  document.getElementById(`left-divide${cardID}`).setAttribute("class", "left-divide-show");
});

const displayTime = ((cardID, data) => {
  const rawTime = data.time_12.toString();
  const displayStart = rawTime.substring(0, 5);
  const displayEnd = rawTime.substring(8, 12);
  const fullTime = displayStart + displayEnd;

  const time24 = data.time_24.toString();
  let numericTime = time24.replaceAll(":", "");
  numericTime = parseInt(numericTime);

  // dayOrNight(cardID, numericTime);

  document.getElementById(`time${cardID}`).innerText = fullTime;
});

function getTimeZone(cardID, coordinates) {
  const lat = coordinates[0];
  const lon = coordinates[1];
  fetch(`https://api.ipgeolocation.io/timezone?apiKey=0ae15b3a240142ebbfeb83ecc76ef062&lat=-${lat}&long=${lon}`, { mode: "cors" })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const date = response.date_time_txt;
      console.log(date);
      const slicedDate = date.slice(0, -15);
      console.log(slicedDate);
      displayDate(cardID, slicedDate);
      displayTime(cardID, response);
    });
}

const displayDate = ((cardID, date) => {
  const dateData = document.getElementById(`date${cardID}`);
  dateData.innerText = date;
});

const cardButtonHandler = ((e) => {
  const card = e.target.id;
  setWeatherDisplay(card);
  hideCardSearch(card);
});

let cardNum = 1;

const cardEventHandler = (() => {
  addCard(cardNum);
  const newCardButton = document.getElementById(`${cardNum}`);
  newCardButton.addEventListener("click", cardButtonHandler);
  cardNum++;
});

const celButton = document.getElementById("cel-button");

function checkTempUnits() {
}

const switchToCel = (() => {
  tempUnits = "metric";
  document.getElementById("cel-button").setAttribute("class", "unit-button-active");
  document.getElementById("far-button").setAttribute("class", "unit-button");
  checkTempUnits();
});

const switchToFar = (() => {
  tempUnits = "imperial";
  document.getElementById("far-button").setAttribute("class", "unit-button-active");
  document.getElementById("cel-button").setAttribute("class", "unit-button");
  checkTempUnits();
});

celButton.addEventListener("click", switchToCel);
const farButton = document.getElementById("far-button");
farButton.addEventListener("click", switchToFar);

const cardButt = document.getElementById("add-card");
cardButt.addEventListener("click", cardEventHandler);

export { cardButtonHandler };
