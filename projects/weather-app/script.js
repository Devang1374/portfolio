const apiKey = "f29a5e84c7f238b18828d25bb9482aaf";

const btn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
let loading = document.getElementById("loading");

btn.addEventListener("click", () => {
    const city = cityInput.value;
    getWeather(city);
});

cityInput.addEventListener("keypress", (e)=>{
    if(e.key === "Enter"){
        getWeather(cityInput.value);
    }
});

async function getWeather(city){
    try{

        loading.innerText = "Loading...";

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error("City not found");
        }

        let data = await response.json();
        const iconCode = data.weather[0].icon;
        let iconCode2 = "🌡";
        let temp = data.main.temp;

        if(temp>30)iconCode2 = "🔥";
        else if(temp<15)iconCode2 = "❄️";
        

        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerHTML = `<legend class=dataLegend>Temperature:</legend><span>${iconCode2}</span><p> ${data.main.temp} °C</p>`;


        document.getElementById("weather").innerHTML = `<legend class=dataLegend>Weather:</legend><img id="icon" alt="weather icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png"> ${data.weather[0].main}`;

        loading.innerText = "";

        localStorage.setItem("lastCity", city);

    } catch(error){
        loading.innerText = error.message;
        document.getElementById("city").innerText = "";
        document.getElementById("temp").innerText = "";
        document.getElementById("weather").innerText = "";
    }
}

window.onload = () => {
    const lastCity = localStorage.getItem("lastCity");
    if(lastCity){
        getWeather(lastCity);
    }

    navigator.geolocation.getCurrentPosition(
        (position)=>{
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getWeatherByCoords(lat, lon);
        },()=>{
            alert("Locatin permission denied");
        }
    );
}

async function getWeatherByCoords(lat, lon){
    try{

        loading.innerText = "Loading...";

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);

        if(!response.ok){
            throw new Error("City not found");
        }

        let data = await response.json();
        const iconCode = data.weather[0].icon;
        let iconCode2 = "🌡";
        let temp = data.main.temp;

        if(temp>30)iconCode2 = "🔥";
        else if(temp<15)iconCode2 = "❄️";
        

        document.getElementById("city").innerText = data.name;
        document.getElementById("temp").innerHTML = `<legend class=dataLegend>Temperature:</legend><span>${iconCode2}</span><p> ${data.main.temp} °C</p>`;


        document.getElementById("weather").innerHTML = `<legend class=dataLegend>Weather:</legend><img id="icon" alt="weather icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png"> ${data.weather[0].main}`;

        loading.innerText = "";

        localStorage.setItem("lastCity", city);

    } catch(error){
        loading.innerText = error.message;
        document.getElementById("city").innerText = "";
        document.getElementById("temp").innerText = "";
        document.getElementById("weather").innerText = "";
    }
}