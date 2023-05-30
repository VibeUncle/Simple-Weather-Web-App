const apiKey = "d786119a7147d277f2d9557b5e75284d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");

const iconBtn = document.getElementById("icon-btn");
const icon = document.getElementById("icon");
const section = document.querySelector("section")

function darkTheme(){
    document.body.classList.toggle("dark-body");
    if(document.body.classList.contains("dark-body")){
        section.style.background = "linear-gradient(135deg, rgb(69, 86, 102), rgb(34, 34, 34))";

        const isdark = document.body.classList.contains('dark-body')

        icon.classList = isdark
        ? 'fa-solid fa-sun'
        : 'fa-solid fa-moon'
    }else{
        icon.classList = 'fa-solid fa-moon';
        section.style.background = " linear-gradient(135deg, #fdbca8, #5b548a)";
    }
}

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

        // console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// -----------this event listener add the click function of the button which will render the weather info of a location that is searched------------------
searchBtn.addEventListener("click", renderInfo);

function renderInfo() {
    checkWeather(searchBox.value);
    if (searchBox.value === "") {
        document.querySelector(".error").innerHTML = "please write a location name";
        document.querySelector(".error").style.display = "block";
    }
}