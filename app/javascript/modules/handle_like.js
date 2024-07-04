import $ from 'jquery'
import axios from 'modules/axios'

const displayHeartStatus = (albumId) => {
  axios.get(`/api/albums/${albumId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleLikeStatus(hasLiked, albumId)
    })
  }

const handleLikeStatus = (hasLiked, albumId) => {
  if (hasLiked) {
    $(`#active-heart-icon-${albumId}`).removeClass('hidden')
  } else {
    $(`#inactive-heart-icon-${albumId}`).removeClass('hidden')
  }
}

const listenInactiveHeartEvent = (albumId) => {
  $(`#inactive-heart-icon-${albumId}`).off('click').on('click', () => {
    axios.post(`/api/albums/${albumId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $(`#active-heart-icon-${albumId}`).removeClass('hidden')
          $(`#inactive-heart-icon-${albumId}`).addClass('hidden')
        }
      })
  })
}

const listenActiveHeartEvent = (albumId) => {
  $(`#active-heart-icon-${albumId}`).off('click').on('click', () => {
    axios.delete(`/api/albums/${albumId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $(`#active-heart-icon-${albumId}`).addClass('hidden')
          $(`#inactive-heart-icon-${albumId}`).removeClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
}

export {
  displayHeartStatus,
  listenInactiveHeartEvent,
  listenActiveHeartEvent
}