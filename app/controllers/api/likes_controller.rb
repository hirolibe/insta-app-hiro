class Api::LikesController < Api::ApplicationController
  before_action :authenticate_user!

  def show
    album = Album.find(params[:album_id])
    like_status = current_user.likes.exists?(album_id: album.id)
    render json: { hasLiked: like_status }
  end

  def create
    album = Album.find(params[:album_id])
    album.likes.create!(user_id: current_user.id)
    render json: { status: 'ok' }
  end

  def destroy
    album = Album.find(params[:album_id])
    like = album.likes.find_by!(user_id: current_user.id)
    like.destroy!
    render json: { status: 'ok' }
  end

end