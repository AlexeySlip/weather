let userDate = new Date();
let userDay = userDate.getDate();
let userYear = userDate.getFullYear();
let userMonth = userDate.getMonth()

let time = {
    hour12: false,
    minute: "numeric",
    hour: "numeric",
    
  };
  let newTime = new Intl.DateTimeFormat("en-us", time).format(userDate);

let dateWeekday = {
    weekday: "long",
  };
  let DayOfWeek = new Intl.DateTimeFormat("en-us", dateWeekday).format(userDate);

let dateMonth = {
  month: "short",
};
let month = new Intl.DateTimeFormat("en-us", dateMonth).format(userDate);

class Weather {
    constructor( data, parent){
        this.name = data.name,
        this.humidity = data.main.humidity,
        this.pressure = data.main.pressure,
        this.wind = data.wind.speed,
        this.icon = data.weather[0]["icon"],
        this.temp = data.main.temp,
        this.feels_like = data.main.feels_like,
        this.deg = data.deg,
        this.description = data.weather[0]["description"],
        this.parent = this.parent = document.querySelector(".weather");
    }

    render() {
        let article = document.createElement("article");
        article.classList.add("row");
        article.classList.add("weather-bacgraund");
        article.innerHTML = `
          <div class="weather-stats-1">
            <div class="date">${userDay} ${month} ${userYear}</div>
            <div class="DayOfWeek">${DayOfWeek}</div>
            <div class="city">${this.name}</div>
            <div class="time">${newTime}</div>
            <div class="humidity">Humidity: ${this.humidity} %</div>
            <div class="pressure">Pressure: ${this.pressure} hPa</div>
            <div class="wind">Wind: ${this.wind} km/h</div>
        </div>
        <div class="weather-stats-2">
            <div class="weather-img"><img src='http://openweathermap.org/img/w/${this.icon}.png' alt=""></div>
            <div class="temp">${this.temp}°C</div>
            <div class="feels_like">Feels like: ${this.feels_like}°C</div>
            <div class="description">${this.description}</div>
        </div>
        `;
        this.parent.append(article);
      }
}

fetch("http://api.openweathermap.org/data/2.5/weather?q=KHARKIV&units=metric&APPID=5d066958a60d315387d9492393935c19&")
  .then((response) => response.json())
  .then((data) => new Weather( data, parent).render());

let input = document.querySelector(".new-city-input");
let buttonWeather = document.querySelector(".new-city-btn");

buttonWeather.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&APPID=5d066958a60d315387d9492393935c19&`
  )
    .then((response) => response.json())
    .then((data) => new Weather(data, parent).render());
});