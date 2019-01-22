Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do 
    resources :athletes, only: [:create]
    resource :session, only: [:create, :destroy]

  root "static_pages#root"
end
