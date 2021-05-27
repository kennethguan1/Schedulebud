Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api, defaults: {format: :json} do
      resources :technicians
      resources :locations
      resources :work_orders
      post '/parse_location', to: 'locations#upload'
      post '/parse_technician', to: 'technicians#upload'
      post '/parse_work_order', to: 'work_orders#upload'
    end

    root "static_pages#root"
end
