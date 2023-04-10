let searchInp = document.querySelector(".weather_search");
let city = document.querySelector(".weather_city");
let day = document.querySelector(".weather_day");
let temperature = document.querySelector(
  ".weather_indicator--temperature>.value"
);
let wind = document.querySelector(".weather_indicator--wind>.value");
let humidity = document.querySelector(".weather_indicator--temperature>.value");
let image = document.querySelector(".weather_image");
let weatherAPIKey = "754ecc599661b8b35214b8ac0f447f7f"; // generated using openweathermap.org
let weatherBaseEndPoint =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
  weatherAPIKey;

// using units = metrics to convert temp from Fahrenheit to celsius

let getWeatherByCityName = async (city) => {
  let endpoint = weatherBaseEndPoint + "&q=" + city;
  let response = await fetch(endpoint);
  let weather = await response.json();
  return weather;
};

getWeatherByCityName("New York");

searchInp.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
    let weather = await getWeatherByCityName(searchInp.value);
    console.log(weather);
  }
});
