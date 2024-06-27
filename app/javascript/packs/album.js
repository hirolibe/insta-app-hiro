import $ from 'jquery'
import axios from 'modules/axios'
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener('turbolinks:load', () => {
  const dataset = $('#album-show').data()
  const albumId = dataset.albumId

  axios.get(`/api/albums/${albumId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })
  const nonActive = $('.active-heart').hasClass('hidden')
  const active = $('.inactive-heart').hasClass('hidden')

  listenInactiveHeartEvent(albumId)
  listenActiveHeartEvent(albumId)
})