Rails.application.routes.draw do
  root to: 'pages#homepage'
  devise_for :users
  resources :users
end
