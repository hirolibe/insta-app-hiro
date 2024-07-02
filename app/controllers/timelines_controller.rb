class TimelinesController < ApplicationController
  before_action :authenticate_user!

  def show
    user_ids = current_user.followings.pluck(:id)
    @albums = Album
      .where(user_id: user_ids)
      .joins(:likes)
      .group(:id)
      .order(Arel.sql('COUNT(likes.id) DESC'))
      .limit(5)
  end
end