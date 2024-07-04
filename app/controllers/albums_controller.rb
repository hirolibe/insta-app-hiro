class AlbumsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :destroy]

  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
  end

  def new
    @album = current_user.albums.build
  end

  def create
    @album = current_user.albums.build(album_params)
    if @album.save
      redirect_to album_path(@album), notice: 'Saved successfully'
    else
      flash.now[:error] = 'Failed to save'
      render :new
    end
  end

  def destroy
    album = current_user.albums.find(params[:id])
    album.destroy!
    redirect_to profile_path, notice: 'Deleted successfully'
  end

  private

  def album_params
    params.require(:album).permit(:title, pictures: [])
  end
end