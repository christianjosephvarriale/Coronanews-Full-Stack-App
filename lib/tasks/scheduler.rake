desc "This task is called by the Heroku scheduler add-on"
task :create_posts => :environment do
  puts "Creating entries from Event Registry API..."
  Post.create_posts
  puts "done."
end

task :update_sitemap => :environment do
  puts "update_sitemap..."
  Post.update_sitemap
  puts "done."
end

task :mail_subscribers => :environment do
  puts "mailing subscribers..."
  Subscriber.mail_subscribers
  puts "done."
end

task :crawl_stats => :environment do
    puts "crawling..."
    Spider.stats
    puts "done."
end