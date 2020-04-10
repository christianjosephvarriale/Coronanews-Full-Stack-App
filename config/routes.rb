Rails.application.routes.draw do
  get 'scaffold/Subscribers'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # post '/scripts/yahoo', to: 'scripts#yahoo'
  get '/posts/region/:region/:page', to: 'posts#show_region'
  post '/posts/title', to: 'posts#show_post'
  post '/mail', to: 'mail#create' 
  get '/meta', to: "application#meta"
  get '/comments', to: 'comments#index'
  post '/comments', to: 'comments#create'
  get '/posts/:page', to: 'posts#index'
  post '/subscribers', to: 'subscribers#subscribe'

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
