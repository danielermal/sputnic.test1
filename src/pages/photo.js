import './photo.css'
import axios from 'axios';
const addButton = document.querySelector('.photo__button')
const photoContainer = document.querySelector('.photo__container')
const popup = document.querySelector('.popup')
const form = popup.querySelector('.popup__form')
const input = popup.querySelector('.popup__text-input')
const popupLoading = popup.querySelector('.popup__loading')


const PHOTO_API_SEARCH = 'https://api.unsplash.com/search/photos'
const PHOTO_API_KEY = 'iqTeHe8PFXjCf8NFNKiumiLKuIb2XACjqzq-uQp1EHw'
const PHOTO_API_RANDOM = 'https://api.unsplash.com/photos/random'

function openPopup () {
  popup.classList.add('popup_opened')
}

function closePopup () {
  popup.classList.remove('popup_opened')
}

addButton.addEventListener('click', openPopup)

popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
    closePopup()
  }
})

function addPhoto (photo) {
  const element = document.querySelector('.template').content.querySelector('.element').cloneNode(true)
  const card = element.querySelector('.photo__item')
  const img = card.querySelector('.photo__img')
  img.src = photo.urls.regular
  const author = card.querySelector('.photo__author')
  author.textContent = photo.user.name
  const name = card.querySelector('.photo__name')
  name.textContent = photo.description
  photoContainer.prepend(card)
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  popupLoading.classList.add('popup__loading_active')
  axios(PHOTO_API_SEARCH, {
    params: {
      query: `${input.value}`,
      client_id: PHOTO_API_KEY
    }
  })
  .then((result) => {
    console.log(result)
    const photos = result.data.results
    console.log(photos)
    photos.forEach((photo) => {
      addPhoto (photo)
    })
    popupLoading.classList.remove('popup__loading_active')
    closePopup()
    photoContainer.style.backgroundImage = ``
  })
  .catch((err) => {
    console.log(err)
  })
})



axios(PHOTO_API_RANDOM, {
  params: {
    client_id: PHOTO_API_KEY
  }
})
.then((result) => {
  console.log(result)
  photoContainer.style.backgroundImage = `url(${result.data.urls.regular}`
})
.catch((err) => {
  console.log(err)
})

