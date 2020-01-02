class MailController < ApplicationController
    protect_from_forgery prepend: true

    def create
      ContactMailer.send_email(params).deliver_now
    end
end
