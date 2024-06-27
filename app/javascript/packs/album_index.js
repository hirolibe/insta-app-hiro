import $ from 'jquery'
import axios from 'modules/axios'
import {
  listenInactiveHeartEventIndex,
  listenActiveHeartEventIndex
} from 'modules/handle_heart_index'

const handleHeartDisplay = (hasLiked, albumId) => {
  if (hasLiked) {
    $(`#active-heart-icon-${albumId}`).removeClass('hidden')
  } else {
    $(`#inactive-heart-icon-${albumId}`).removeClass('hidden')
  }
}

document.addEventListener('turbolinks:load', () => {
  // すべてのアルバムカード要素を取得
  const albums = document.querySelectorAll('.card')

  albums.forEach((album) => {
    // 各アルバムのデータセットを取得
    const dataset = album.dataset
    const albumId = dataset.albumId

    // APIリクエストを送信してlike状態を取得
    axios.get(`/api/albums/${albumId}/like`)
      .then((response) => {
        const hasLiked = response.data.hasLiked
        handleHeartDisplay(hasLiked, albumId)
      })

    listenInactiveHeartEventIndex(albumId)
    listenActiveHeartEventIndex(albumId)
  })
})
