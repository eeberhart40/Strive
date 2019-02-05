Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do 
    resources :athletes, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :routes, only: [:create, :destroy, :show, :index]
    resources :activities, only: [:create, :destroy, :show, :index, :edit, :update]
  end

  root "static_pages#root"
end
