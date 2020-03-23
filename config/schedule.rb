# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

every 1.day, at: '10:00 pm' do
    command 'heroku run rake update_feed --app sleepy-anchorage-08584' 
end

every 1.day, at: '9:00 am' do
    command 'heroku run rake mail_subscribers --app sleepy-anchorage-08584' 
end

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end

# Learn more: http://github.com/javan/whenever
