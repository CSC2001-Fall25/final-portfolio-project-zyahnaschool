async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  if (!city) {
    error.textContent = "Please enter a city name.";
    card.classList.add("hidden");
    return;
  }

  error.textContent = "";

  try {
    // 1️⃣ Geocoding
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;
    const cityName = place.name;

    // 2️⃣ Current weather
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const weatherRes = await fetch(weatherURL);
    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;

    // 3️⃣ Update UI
    document.getElementById("cityName").textContent = cityName;
    document.getElementById("temp").textContent = `Temperature: ${current.temperature}°C`;
    document.getElementById("windspeed").textContent = `Wind Speed: ${current.windspeed} km/h`;
    document.getElementById("winddirection").textContent = `Wind Direction: ${current.winddirection}°`;
    document.getElementById("condition").textContent = `Conditions: ${weatherIcon(current.weathercode)} ${interpretWeatherCode(current.weathercode)}`;


    card.classList.remove("hidden");

  } catch (err) {
    error.textContent = "City not found or API error.";
    card.classList.add("hidden");
  }
}

// Map weather codes to human-readable conditions
function interpretWeatherCode(code) {
  const codes = {
    0: "Clear",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Rain Showers",
    81: "Moderate Showers",
    82: "Violent Showers",
    95: "Thunderstorm",
    96: "Thunderstorm + Hail",
    99: "Severe Thunderstorm + Hail",
  };
  return codes[code] || "Unknown";
}


function weatherIcon(code) {
  const icons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    48: "🌫️",
    51: "🌦️",
    53: "🌦️",
    55: "🌧️",
    61: "🌧️",
    63: "🌧️",
    65: "🌧️",
    71: "❄️",
    73: "❄️",
    75: "❄️",
    77: "❄️",
    80: "🌦️",
    81: "🌧️",
    82: "⛈️",
    95: "⛈️",
    96: "⛈️",
    99: "⛈️",
  };
  return icons[code] || "❓";
}
