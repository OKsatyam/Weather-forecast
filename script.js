$(document).ready(function () {
 
  $("#searchBtn").click(function () {
    const city = $("#cityInput").val().trim();
    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  });

 
  async function fetchWeather(city) {
    const apiUrl = `https://wttr.in/${city}?format=j1`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data. Please try again.");
    }
  }

  
  function displayWeather(data) {
    const cityName = data.nearest_area[0].areaName[0].value;
    const country = data.nearest_area[0].country[0].value;
    const temperature = data.current_condition[0].temp_C;
    const humidity = data.current_condition[0].humidity;
    const weatherCondition = data.current_condition[0].weatherDesc[0].value;

    
    let weatherIcon = "";
    if (weatherCondition.toLowerCase().includes("sunny")) {
      weatherIcon = "https://img.icons8.com/color/96/000000/sun.png";
    } else if (weatherCondition.toLowerCase().includes("cloud")) {
      weatherIcon = "https://img.icons8.com/color/96/000000/cloud.png";
    } else if (weatherCondition.toLowerCase().includes("rain")) {
      weatherIcon = "https://img.icons8.com/color/96/000000/rain.png";
    } else {
      weatherIcon = "https://img.icons8.com/color/96/000000/partly-cloudy-day.png";
    }

    const weatherHtml = `
      <h2>${cityName}, ${country}</h2>
      <img src="${weatherIcon}" alt="${weatherCondition}" class="weather-icon">
      <div class="weather-detail">Temperature: ${temperature}°C</div>
      <div class="weather-detail">Humidity: ${humidity}%</div>
      <div class="weather-detail">Condition: ${weatherCondition}</div>
    `;

    $("#weatherInfo").html(weatherHtml);
  }
});
