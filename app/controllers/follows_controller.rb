class FollowsController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def index
    @user = User.find(params[:account_id])
  end

  def show
    user = User.find(params[:account_id])
    follow_status = current_user.has_followed?(user)
    render json: {
      followersCount: user.followers.count,
      hasFollowed: follow_status
    }
  end

  def create
    current_user.follow!(params[:account_id])
    user = User.find(params[:account_id])
    render json: {
      followersCount: user.followers.count
    }
  end
end