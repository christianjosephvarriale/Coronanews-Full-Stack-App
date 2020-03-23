class SubscribersController < ApplicationController
    require 'pp'
    require 'rest-client'
    skip_before_action :verify_authenticity_token

    # subscribes the USER to corresponding mailing lists
    def subscribe

      Subscriber.create(:address => params[:address], :countries => params[:countries])
      
      if params[:countries] == 'all'

        RestClient.post("https://api:%s" \
                    "@api.mailgun.net/v3/lists/all@coronanews.ca/members" % ENV['MAILGUN_APIKEY'],
                    :subscribed => true,
                    :address => params[:address])

        render json: :OK
      
      else

        for country in params[:countries] do
          RestClient.post("https://api:%s" \
                    "@api.mailgun.net/v3/lists/%s@coronanews.ca/members" % [ ENV['MAILGUN_APIKEY'], country ],
                    :subscribed => true,
                    :address => params[:address])
  
        end 
        render json: :OK

      end
    end
  
    private
      # Only allow a trusted parameter "white list" through.
      def subscribers_params
        params.permit(:address, :countries)
      end
end
