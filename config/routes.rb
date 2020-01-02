Rails.application.routes.draw do
  resources :comments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # post '/scripts/yahoo', to: 'scripts#yahoo'
  post '/scripts/amazon', to: 'scripts#amazon'
  post '/mail', to: 'mail#create' 
  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
