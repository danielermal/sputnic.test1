import './index.css';
import axios from 'axios';

const weatherImage = document.querySelector('.weather')
const weatherTitle = document.querySelector('.weather__title')
const weatherData = document.querySelector('.weather__data')
const weatherInfo = document.querySelector('.weather__info')
const page = document.querySelector('.page')

const hours = new Date().getHours()

function changeTheme() {
  if (hours >= 8 && hours < 20) {
    page.classList.add('page_theme_white')
    weatherTitle.classList.add('page_theme_white')
    weatherData.classList.add('page_theme_white')
    weatherInfo.classList.add('page_theme_white')
  }
  else {
    page.classList.remove('page_theme_white')
    weatherTitle.classList.remove('page_theme_white')
    weatherData.classList.remove('page_theme_white')
    weatherInfo.classList.remove('page_theme_white')
  }
}

changeTheme()

function zeroFormat(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

function dateTime()
{
    const current_datetime = new Date();
    const day = zeroFormat(current_datetime.getDate());
    const month = zeroFormat(current_datetime.getMonth()+1);
    const year = current_datetime.getFullYear();
    const hours = zeroFormat(current_datetime.getHours());
    const minutes = zeroFormat(current_datetime.getMinutes());
    const seconds = zeroFormat(current_datetime.getSeconds());

    weatherData.textContent = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

setInterval(() => {
  dateTime()
}, 1000)

const API_KEY = '276d54c4769b00cdee94cf9e7bacc988'
const OPENWEATHER_API = 'https://api.openweathermap.org/data/2.5/weather'

axios(OPENWEATHER_API, {
  params: {
    q: 'Tomsk',
    appid: API_KEY,
    units: 'metric',
    lang: 'ru'
  }
})
.then((result) => {
  console.log(result)
  weatherTitle.textContent = `Погода в ${result.data.name}`
  weatherImage.style.backgroundImage = `url(https://openweathermap.org/img/wn/${result.data.weather[0]['icon']}@2x.png)`
  weatherInfo.textContent = `${Math.round(result.data.main.temp)} ℃, ${result.data.weather[0].description}`
})
.catch((err) =>  {
  console.log(err)
})


const NASA_API = 'https://api.nasa.gov/planetary/apod'
const NASA_API_KEY = 'gTr40Ld9XaljH0HlrhodKOmLfNsidJoIRbzyeW6B'

const nasaImage = document.querySelector('.header')
const nasaTitle = document.querySelector('.header__title')
const nasaSubtitle = document.querySelector('.header__subtitle')

axios(NASA_API, {
  params: {
    api_key: NASA_API_KEY
  }
})
.then((result) => {
  console.log(result)
  nasaImage.style.backgroundImage = `url(${result.data.url}`
  nasaTitle.textContent = result.data.title
  nasaSubtitle.textContent = result.data.explanation
})
.catch((err) => {
  console.log(err)
})
