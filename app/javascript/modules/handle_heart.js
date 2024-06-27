import $ from 'jquery'
import axios from 'modules/axios'

const listenInactiveHeartEvent = (albumId) => {
  $('.inactive-heart').off('click').on('click', () => {
  axios.post(`/api/albums/${albumId}/like`)
    .then((response) => {
      if (response.data.status === 'ok') {
        $('.active-heart').removeClass('hidden')
        $('.inactive-heart').addClass('hidden')
      }
    })
    .catch((e) => {
      window.alert('Error')
      console.log(e)
    })
  })
}

const listenActiveHeartEvent = (albumId) => {
  $('.active-heart').off('click').on('click', () => {
    axios.delete(`/api/albums/${albumId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          $('.active-heart').addClass('hidden')
          $('.inactive-heart').removeClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  })
}

export {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
}