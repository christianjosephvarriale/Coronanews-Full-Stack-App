Rails.application.routes.draw do
  get 'scaffold/Subscribers'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # post '/scripts/yahoo', to: 'scripts#yahoo'
  get '/posts/:region', to: 'posts#show'
  post '/scripts/amazon', to: 'scripts#amazon'
  post '/mail', to: 'mail#create' 
  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'
  get '/posts', to: 'posts#index'
  post '/subscribers', to: 'subscribers#subscribe'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
