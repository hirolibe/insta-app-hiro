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
  const albums = document.querySelectorAll('.card')
  albums.forEach((album) => {
    const albumDataset = album.dataset
    if (albumDataset.albumId) {
      const albumId = albumDataset.albumId
      const authorId = albumDataset.authorId
      const currentUserId = albumDataset.currentUserId
      // いいね
      displayHeartStatus(albumId, authorId, currentUserId)
      listenInactiveHeartEvent(albumId)
      listenActiveHeartEvent(albumId)

      // コメント
      displayComments(albumId)
      displayCommentForm()
      postComment(albumId)
    }
  })

  // フォロー
  if ($('.profile').length) {
    const followDataset = $('.profile').data()
    if (followDataset.accountId) {
      const accountId = followDataset.accountId
      const followId = followDataset.followId
      displayFollowStatus(accountId, followId)
      listenFollowEvent(accountId)
      listenUnfollowEvent(accountId)
    }
  }
})