const appKey = "b588fd4c61f4296200aa8bfc8ccfb67b";

const input = document.querySelector("#searchInput");
const button = document.querySelector("#searchButton");
const weatherContainer = document.querySelector("#weatherContainer");
const latLon = document.querySelector("#latLon");

const getWeather = async () => {
  try {
    button.disabled = true;
    button.textContent = "searching...";
    if (marker) {
      map.removeLayer(marker);
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${appKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const getWeather = data.main;
    console.log(data);
    console.log(getWeather);

    dissplayWeather(data.main);
  } catch (error) {
    console.log("error cannot get specified weather");
    weatherContainer.innerHTML =
      "No Weather Report Found. Please Enter correct Details";
  } finally {
    button.disabled = false;
    button.textContent = "Get Weather";
    input.value = "";
  }
};

const dissplayWeather = (weather) => {
  weatherContainer.innerHTML = ""
  ;
  latitude.innerHTML = '';
  longitude.innerHTML = '';
  if (weather.length === 0) {
    weatherContainer.innerHTML = "No Weather Report Found";
  } else {
    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weather-card");

    const title = document.createElement("h1");
    const cityName = input.value;
    const capsName = cityName.toUpperCase();
    title.textContent = capsName;

    const tempKelvin = weather.temp;
    const tempCelsius = Math.round(tempKelvin - 273);
    const temp = document.createElement("h4");
    temp.textContent = `Temperature ${tempCelsius}° Celsius`;

    const feelkelvin = weather.feels_like;
    const feelsCelsius = Math.round(feelkelvin - 273);
    const feelsLike = document.createElement("h4");
    feelsLike.textContent = `Feels like ${feelsCelsius}° Celsius`;

    const humidity = document.createElement("h4");
    humidity.textContent = `Humidity : ${weather.humidity}%`;

    const pressure = document.createElement("h4");
    pressure.textContent = `Pressure : ${weather.pressure} mBar`;

    weatherDiv.appendChild(title);
    weatherDiv.appendChild(temp);
    weatherDiv.appendChild(feelsLike);
    weatherDiv.appendChild(humidity);
    weatherDiv.appendChild(pressure);
    weatherContainer.appendChild(weatherDiv);
  }
};

button.addEventListener("click", getWeather);


var map = L.map("map").setView([20.5937, 78.9629], 4.5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    console.log(lat);
    console.log(lng);
    document.querySelector("#latitude").innerHTML = `<h4>Latitude: ${lat}</h4>`;
    document.querySelector(
      "#longitude"
    ).innerHTML = `<h4> Longitude: ${lng}</h4>`;
    return { lat, lng };
  };
  
  const getWeather1 = async (lat, lng) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${appKey}`;
      const response = await fetch(url);
      const data = await response.json();
  
      const weatherData = data.main;
      console.log(data);
      console.log(weatherData);
  
      displayWeather(weatherData);
    } catch (error) {
      console.log(error);
      weatherContainer.innerHTML =
        "No Weather Report Found. Please enter correct details.";
    }
  };

  const displayWeather = (weather) => {
    weatherContainer.innerHTML = "";
  
    if (Object.keys(weather).length === 0) {
      weatherContainer.innerHTML = "No Weather Report Found";
    } else {
      const weatherDiv = document.createElement("div");
      weatherDiv.classList.add("weather-card");
  
      const tempKelvin = weather.temp;
      const tempCelsius = Math.round(tempKelvin - 273);
      const temp = document.createElement("h4");
      temp.textContent = `Temperature : ${tempCelsius}° Celsius`;
  
      const feelkelvin = weather.feels_like;
      const feelsCelsius = Math.round(feelkelvin - 273);
      const feelsLike = document.createElement("h4");
      feelsLike.textContent = `Feels like ${feelsCelsius}° Celsius`;
  
      const humidity = document.createElement("h4");
      humidity.textContent = `Humidity : ${weather.humidity}%`;
  
      const pressure = document.createElement("h4");
      pressure.textContent = `Pressure : ${weather.pressure} mBar`;
  
      weatherDiv.appendChild(temp);
      weatherDiv.appendChild(feelsLike);
      weatherDiv.appendChild(humidity);
      weatherDiv.appendChild(pressure);
      weatherContainer.appendChild(weatherDiv);
    }
  };
  
  var marker;
  
  map.on("click", (event) => {
    const { lat, lng } = handleMapClick(event);
    getWeather1(lat, lng);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker([lat, lng]).addTo(map);
  });
  