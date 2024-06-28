class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]

  def index
    album = Album.find(params[:album_id])
    @comments = album.comments
  end

  def new
    album = Album.find(params[:album_id])
    @comment = album.comments.build
  end

  def create
    album = Album.find(params[:album_id])
    @comment = album.comments.build(comment_params)
    @comment.user = current_user
    if @comment.save
      redirect_to album_comments_path(album_id: album.id)
    else
      flash.now[:error] = 'コメントできませんでした'
      render :new
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:content)
  end
end