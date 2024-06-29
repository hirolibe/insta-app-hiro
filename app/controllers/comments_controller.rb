class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    @album = Album.find(params[:album_id])
    comments = @album.comments
    comments_info = comments.map do |comment|
      comment_info(comment)
    end

    render json: comments_info
  end

  def create
    album = Album.find(params[:album_id])
    comment = album.comments.build(comment_params)
    comment.user = current_user
    comment.save!
    comment_info = comment_info(comment)

    render json: comment_info
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end

  def comment_info(comment)
    {
      id: comment.id,
      content: comment.content,
      user: {
        account: comment.user.account,
        avatar_url: url_for(comment.user.avatar)
      }
    }
  end
end