let grade = document.getElementById('grade');
let weather = document.getElementById('weather');
let city = document.getElementById('city');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
let userCity;

searchBtn.addEventListener('click', () => {
    userCity = cityInput.value;
    loadWeather(userCity);
    cityInput.value = '';
})

function changeBG(temp) {
    if (temp >= 0 && temp <= 10) {
        document.body.style.animationName = 'cold'
        setTimeout(() => {
            document.body.style.backgroundColor = 'aqua'
          }, 1600);
    } else if (temp >= 11 && temp <= 20) {
        document.body.style.animationName = 'fresh'
        setTimeout(() => {
            document.body.style.backgroundColor = 'rgb(169, 235, 235)'
          }, 1600);
    } else if (temp >= 21) {
        document.body.style.animationName = 'hot'
        setTimeout(() => {
            document.body.style.backgroundColor = 'rgb(235, 235, 169)'
          }, 1600);
    } 
}

function reloadHTML(data) {
    console.log(data)
    let temp = Math.round(data.main.temp)
    grade.textContent=`${temp}°C`
    weather.textContent=`${data.weather[0].main}`
    city.textContent=`${data.name}`
    changeBG(temp);
}

function loadWeather(userCity) {
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=0b1d0b0664760aff33f2208cf1b4936c`
        
        fetch(urlCity)
            .then(response => {return response.json()})
            .then(data => {
                reloadHTML(data);
            })
            .catch(error => {
                console.log(error)
            })
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        
        const urlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0b1d0b0664760aff33f2208cf1b4936c`
        
        fetch(urlPosition)
            .then(response => {return response.json()})
            .then(data => {
                reloadHTML(data);
            })
            .catch(error => {
                console.log(error)
            })
    })
}