Rails.application.routes.draw do
  resources :expense_items
  resources :deadlines
  resources :counts
  root to: 'pages#homepage'
  devise_for :users
  resources :users
  resources :counts
  resources :expense_items
  resources :movements
end
