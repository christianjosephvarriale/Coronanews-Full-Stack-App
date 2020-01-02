# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :user_name => 'apikey',
  :password => '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',
  :domain => 'sendgrid.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}