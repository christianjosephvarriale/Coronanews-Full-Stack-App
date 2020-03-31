desc "This task is called by the Heroku scheduler add-on"
task :create_contentful => :environment do
  puts "Creating entries in Contentful..."
  Post.create_contentful
  puts "done."
end

task :sync_database => :environment do
  puts "Syncing the database..."
  Post.sync_database
  puts "done."
end

task :mail_subscribers => :environment do
  puts "mailing subscribers..."
  Subscriber.mail_subscribers
  puts "done."
end