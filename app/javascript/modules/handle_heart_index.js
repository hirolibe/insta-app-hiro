import $ from 'jquery'
import axios from 'modules/axios'

const listenInactiveHeartEventIndex = (albumId) => {
  $(`#inactive-heart-icon-${albumId}`).off('click').on('click', () => {
    axios.post(`/api/albums/${albumId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $(`#active-heart-icon-${albumId}`).removeClass('hidden')
          $(`#inactive-heart-icon-${albumId}`).addClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
}

const listenActiveHeartEventIndex = (albumId) => {
  $(`#active-heart-icon-${albumId}`).off('click').on('click', () => {
    axios.post(`/api/albums/${albumId}/like`)
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
  listenInactiveHeartEventIndex,
  listenActiveHeartEventIndex
}