// Get DOM elements
const searchInput = document.querySelector(".weather_search");
const weatherCity = document.querySelector(".weather_city");
const weatherDay = document.querySelector(".weather_day");
const weatherTemp = document.querySelector(
  ".weather_indicator--temperature .value"
);
const weatherWind = document.querySelector(".weather_indicator--wind .value");
const weatherHumidity = document.querySelector(
  ".weather_indicator--humidity .value"
);
const weatherImage = document.querySelector(".weather_image");
const weatherForcastItems = document.querySelectorAll(".weather_forcast_item");

// OpenWeatherMap API Key
const apiKey = "754ecc599661b8b35214b8ac0f447f7f";

// Event listener for search input
searchInput.addEventListener("keypress", async (event) => {
  if (event.keyCode === 13) {
    // Check if enter key is pressed
    const city = searchInput.value;
    if (city) {
      // Fetch current weather data
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      // Fetch 5-day forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      // Update DOM with current weather data
      weatherCity.textContent = currentWeatherData.name;
      weatherDay.textContent = new Date().toLocaleDateString();
      weatherTemp.textContent = `${(
        currentWeatherData.main.temp - 273.15
      ).toFixed(2)}°C`;
      weatherWind.textContent = `${currentWeatherData.wind.speed}mph`;
      weatherHumidity.textContent = `${currentWeatherData.main.humidity}%`;
      let weatherIcon = currentWeatherData.weather[0].icon;
      let weatherImageUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
      weatherImage.src = weatherImageUrl;

      // Update DOM with forecast data
      for (let i = 0; i < weatherForcastItems.length; i++) {
        const forecastItem = weatherForcastItems[i];
        const forecast = forecastData.list[i * 8 + 4];
        const forecastDate = new Date(forecast.dt_txt);
        const forecastIcon = forecast.weather[0].icon;
        const forecastTemp = forecast.main.temp;
        const forecastWind = forecast.wind.speed;
        const forecastHumidity = forecast.main.humidity;

        forecastItem.querySelector(
          ".weather_forcast_icon"
        ).src = `https://openweathermap.org/img/w/${forecastIcon}.png`;
        forecastItem.querySelector(".weather_forcast_day").textContent =
          forecastDate.toLocaleDateString();
        forecastItem.querySelector(
          ".weather_forcast_temp .value"
        ).textContent = `Temp: ${(forecastTemp - 273.15).toFixed(2)}°C`;
        forecastItem.querySelector(
          ".weather_forcast_wind .value"
        ).textContent = `Wind: ${forecastWind}mph`;
        forecastItem.querySelector(
          ".weather_forcast_humidity .value"
        ).textContent = `Humidity: ${forecastHumidity}%`;
      }
    }
  }
});
