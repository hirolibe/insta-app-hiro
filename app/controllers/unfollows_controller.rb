class UnfollowsController < ApplicationController
  before_action :authenticate_user!

  def create
    current_user.unfollow!(params[:account_id])
    user = User.find(params[:account_id])
    render json: {
      followersCount: user.followers.count
    }
  end
end