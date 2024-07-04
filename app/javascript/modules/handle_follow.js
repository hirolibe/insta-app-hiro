import $ from 'jquery'
import axios from 'modules/axios'

const displayFollowStatus = (accountId, followId) => {
  axios.get(`/accounts/${accountId}/follows/${followId}`)
  .then((res) => {
    const followersCount = res.data.followersCount
    const hasFollowed = res.data.hasFollowed
    handleFollowStatus(followersCount, hasFollowed)
  })
}

const handleFollowStatus = (followersCount, hasFollowed) => {
  $('#followers-count').append(`<p>${followersCount}</p>`)
  if (hasFollowed) {
    $('.unfollow_btn').removeClass('hidden')
  } else {
    $('.follow_btn').removeClass('hidden')
  }
}

const listenFollowEvent = (accountId) => {
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
}

const listenUnfollowEvent = (accountId) => {
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

export {
  displayFollowStatus,
  listenFollowEvent,
  listenUnfollowEvent
}