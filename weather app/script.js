const apiKey = "58cd5e662d4c5e6760694d4b56246fb3";

const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});
async function getWeather() {

    const city = cityInput.value.trim();
    console.log(city);

    if(city === ""){
        alert("Please enter a city");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{

        const response = await fetch(url);
const data = await response.json();

console.log(data);

if (!response.ok) {
    alert(data.message);
    return;
}

displayWeather(data);
    }

    catch(error){

        alert(error.message);

    }
    }


function displayWeather(data){

    document.getElementById("cityName").textContent = data.name;

    document.getElementById("temperature").textContent =
    `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").textContent =
    data.weather[0].description;

    document.getElementById("humidity").textContent =
    `💧 Humidity: ${data.main.humidity}%`;

    document.getElementById("wind").textContent =
    `🌬️ Wind: ${data.wind.speed} km/h`;

    const icon = data.weather[0].icon;

    document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
localStorage.setItem("lastCity", data.name);
}
window.onload = () => {

    const lastCity = localStorage.getItem("lastCity");

    if(lastCity){

        cityInput.value = lastCity;

        getWeather();

    }

};