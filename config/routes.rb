Rails.application.routes.draw do
  resources :deadlines
  resources :counts
  root to: 'pages#homepage'
  devise_for :users
  resources :users
  resources :counts
end
