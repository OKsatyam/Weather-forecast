document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");
    const weatherResults = document.getElementById("weather-results");
  
    // Search event handlers
    searchBtn.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSearch();
    });
  
    function handleSearch() {
      const city = searchInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    }
  
    async function fetchWeatherData(city) {
      try {
        // Show loading state
        weatherResults.classList.add("d-none");
  
        // Using cors-anywhere to bypass CORS issues
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://wttr.in/${encodeURIComponent(
            city
          )}?format=j1`,
          {
            headers: {
              Origin: window.location.origin,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
  
        const data = await response.json();
        displayWeatherData(data);
        weatherResults.classList.remove("d-none");
      } catch (error) {
        console.error("Error:", error);
        alert("Error fetching weather data. Please try again.");
      }
    }
  
    function displayWeatherData(data) {
      try {
        const current = data.current_condition[0];
        const location = data.nearest_area[0];
  
        // Basic weather info
        document.querySelector(".city-name").textContent =
          location.areaName[0].value;
        document.querySelector(".country-name").textContent =
          location.country[0].value;
        document.querySelector(
          ".temperature"
        ).textContent = `${current.temp_C}°C`;
  
        // Additional weather info
        document.querySelector(
          ".min-temp"
        ).textContent = `Min: ${data.weather[0].mintempC}°C`;
        document.querySelector(
          ".max-temp"
        ).textContent = `Max: ${data.weather[0].maxtempC}°C`;
        document.querySelector(
          ".avg-temp"
        ).textContent = `Feels like: ${current.FeelsLikeC}°C`;
        document.querySelector(".description").textContent =
          current.weatherDesc[0].value;
        document.querySelector(
          ".humidity-value"
        ).textContent = `${current.humidity}% Humidity`;
        document.querySelector(
          ".wind-value"
        ).textContent = `${current.windspeedKmph} km/h Wind`;
  
        // Update weather icon
        updateWeatherIcon(current.weatherDesc[0].value.toLowerCase());
      } catch (error) {
        console.error("Error displaying data:", error);
        alert("Error displaying weather data");
      }
    }
  
    function updateWeatherIcon(description) {
      const weatherIcon = document.querySelector(".weather-icon i");
      if (description.includes("rain")) {
        weatherIcon.className = "bi bi-cloud-rain-fill";
      } else if (description.includes("cloud")) {
        weatherIcon.className = "bi bi-cloud-fill";
      } else if (description.includes("sun") || description.includes("clear")) {
        weatherIcon.className = "bi bi-sun-fill";
      } else if (description.includes("snow")) {
        weatherIcon.className = "bi bi-snow";
      } else if (description.includes("thunder")) {
        weatherIcon.className = "bi bi-lightning-fill";
      } else {
        weatherIcon.className = "bi bi-cloud-sun";
      }
    }
  });
  