// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import $ from 'jquery'
import axios from 'modules/axios'
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'

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
    if (albumId) {
      // APIリクエストを送信してlike状態を取得
      axios.get(`/api/albums/${albumId}/like`)
        .then((response) => {
          const hasLiked = response.data.hasLiked
          handleHeartDisplay(hasLiked, albumId)
        })

      listenInactiveHeartEvent(albumId)
      listenActiveHeartEvent(albumId)
      }
  })
})
