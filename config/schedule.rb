# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

every 1.day, at: '12:10 am' do
    command 'heroku run rake crawl_stats --app coronanews-prod' 
end

every 1.day, at: '12:20 am' do
    command 'heroku run rake create_posts --app coronanews-prod' 
end

every 1.day, at: '12:30 am' do
    command 'heroku run rake update_sitemap --app coronanews-prod' 
end

every 1.day, at: '11:00 am' do
    command 'heroku run rake mail_subscribers --app coronanews-prod' 
end