class AvatarsController < ApplicationController
  before_action :authenticate_user!

  def update
    @user = current_user
    if @user.update(avatar_params)
      redirect_to profile_path, notice: 'アバターが更新されました'
    else
      render profile_path
    end
  end

  private

  def avatar_params
    params.require(:user).permit(:avatar)
  end
end