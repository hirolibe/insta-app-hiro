Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'albums#index'

  resources :albums do
    resources :comments, only: [:index, :create]
  end

  resource :profile, only: [:show, :edit, :update]
  resource :avatar, only: [:update]

  namespace :api, defaults: {format: :json} do
    scope 'albums/:album_id' do
      resource :like, only: [:show, :create, :destroy]
    end
  end
end
