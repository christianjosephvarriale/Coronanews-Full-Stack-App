class ContactMailer < ApplicationMailer

    # send an email to Varritech w contact info
    def send_email(params)
      mail( :from => params[:email], :to => 'varritech@gmail.com', :subject => params[:subject], :body => params[:message] )
    end
  end