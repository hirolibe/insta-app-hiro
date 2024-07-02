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

const handleCommentForm = () => {
  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })
}

const appendNewComment = (comment) => {
  $('.comment-container').append(
    `<div class="card">
      <div class="card_top">
        <div class="card_top_image">
          <a href="${comment.user.account_path}">
            <img src="${comment.user.avatar_url}" alt="Avatar">
          </a>
        </div>
        <div class="card_top_detail">
          <div class="card_top_detail_name">
            <p>${comment.user.account}</p>
          </div>
          <div class="card_top_detail_info">
            <p>${comment.content}</p>
          </div>
      </div>
    </div>`
  )
}

document.addEventListener('turbolinks:load', () => {
  if ($('.card').length) {
    // すべてのアルバムカード要素を取得
    const albums = document.querySelectorAll('.card')
    albums.forEach((album) => {
      const albumDataset = album.dataset
      const albumId = albumDataset.albumId
      if (albumId) {
        // Like
        // いいね状態の取得
        axios.get(`/api/albums/${albumId}/like`)
          .then((response) => {
            const hasLiked = response.data.hasLiked
            handleHeartDisplay(hasLiked, albumId)
          })
        // いいねボタンを押す
        listenInactiveHeartEvent(albumId)
        listenActiveHeartEvent(albumId)

        // Comment
        // 一覧の取得
        axios.get(`/albums/${albumId}/comments`)
          .then((res) => {
            const comments = res.data
            comments.forEach((comment) => {
              appendNewComment(comment)
            })
          })
        // コメント投稿フォームの表示
        handleCommentForm()
        // コメント投稿
        $('.add-comment-button').off('click').on('click', () => {
          const content = $('#comment_content').val()
          $('.show-comment-form').removeClass('hidden')
          $('.comment-text-area').addClass('hidden')
          if (!content.trim()) {
            window.alert('コメントを入力してください')
          } else {
            axios.post(`/albums/${albumId}/comments`, {
              comment: {content: content}
            })
              .then((res) => {
                const comment = res.data
                appendNewComment(comment)
                $('#comment_content').val('')
              })
          }
        })
      }
    })
  }

  // フォロー
  if ($('.profile').length) {
    const followDataset = $('.profile').data()
    const accountId = followDataset.accountId
    const followId = followDataset.followId
    // フォロー状態の取得
    axios.get(`/accounts/${accountId}/follows/${followId}`)
      .then((res) => {
        const followersCount = res.data.followersCount
        const hasFollowed = res.data.hasFollowed
        $('#followers-count').append(`<p>${followersCount}</p>`)
        if (hasFollowed) {
          $('.unfollow_btn').removeClass('hidden')
        } else {
          $('.follow_btn').removeClass('hidden')
        }
      })
    // フォロー
    $('.follow_btn').off('click').on('click', () => {
      axios.post(`/accounts/${accountId}/follows`)
        .then((res) => {
          const followersCount = res.data.followersCount
          $('.follow_btn').addClass('hidden')
          $('.unfollow_btn').removeClass('hidden')
          $('#followers-count').empty()
          $('#followers-count').append(`<p>${followersCount}</p>`)
        })
    })
    // アンフォロー
    $('.unfollow_btn').off('click').on('click', () => {
      axios.post(`/accounts/${accountId}/unfollows`)
        .then((res) => {
          const followersCount = res.data.followersCount
          $('.unfollow_btn').addClass('hidden')
          $('.follow_btn').removeClass('hidden')
          $('#followers-count').empty()
          $('#followers-count').append(`<p>${followersCount}</p>`)
        })
    })
  }
})