import $ from 'jquery'
import axios from 'modules/axios'

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

const displayComments = (albumId) => {
  axios.get(`/api/albums/${albumId}/comments`)
  .then((res) => {
    const comments = res.data
    comments.forEach((comment) => {
      appendNewComment(comment)
    })
  })
}

const displayCommentForm = () => {
  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })
}

const hideCommentForm = () => {
  $('.show-comment-form').removeClass('hidden')
  $('.comment-text-area').addClass('hidden')
}

const postComment = (albumId) => {
  $('.add-comment-button').off('click').on('click', () => {
    const content = $('#comment_content').val()
    hideCommentForm()
    if (!content.trim()) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/api/albums/${albumId}/comments`, {
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

export {
  displayComments,
  displayCommentForm,
  postComment
}