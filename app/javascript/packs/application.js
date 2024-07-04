require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import $ from 'jquery'
import axios from 'modules/axios'

import {
  displayHeartStatus,
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_like'

import {
  displayComments,
  displayCommentForm,
  postComment
} from 'modules/handle_comment'

import {
  displayFollowStatus,
  listenFollowEvent,
  listenUnfollowEvent
} from 'modules/handle_follow'

document.addEventListener('turbolinks:load', () => {
  if ($('.card').length) {
    const albums = document.querySelectorAll('.card')
    albums.forEach((album) => {
      const albumDataset = album.dataset
      const albumId = albumDataset.albumId
      if (albumId) {
        // いいね
        displayHeartStatus(albumId)
        listenInactiveHeartEvent(albumId)
        listenActiveHeartEvent(albumId)

        // コメント
        displayComments(albumId)
        displayCommentForm()
        postComment(albumId)
      }
    })
  }

  // フォロー
  if ($('.profile').length) {
    const followDataset = $('.profile').data()
    const accountId = followDataset.accountId
    const followId = followDataset.followId
    displayFollowStatus(accountId, followId)
    listenFollowEvent(accountId)
    listenUnfollowEvent(accountId)
  }
})