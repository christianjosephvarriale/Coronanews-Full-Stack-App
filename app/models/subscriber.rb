class Subscriber < ApplicationRecord
    require 'json'

    # sends out 24 hour breaking news to mailing lists 
    def self.mail_subscribers

        regions = ['ca']

        regions_map = { 
            'ca' => 'Canada'
        }

        for @region in regions do 

            # if date - date.now < 24 hrs and :region = region, mail out post data, with a header img      
            @posts = Post.where({ region: @region, date: (Time.now.midnight - 1.day)..Time.now.midnight }).where.not(headerImg: [nil, ""])

            @formatted_posts = @posts.map do |post|

                if post.title.length > 100
                    title = post.title[0..100] + '...'
                else
                    title = post.title
                end

                { :img => post.headerImg, :title => post.title, :author => post.author, :url => post.url }
            end
    
            @template_vars = { :countries => regions_map[@region], :date => Time.zone.now.to_date, :posts => @formatted_posts }.to_json

            RestClient.post "https://api:#{ENV['MAILGUN_APIKEY']}"\
            "@api.mailgun.net/v3/coronanews.ca/messages",
            :from => "Corona News <news@coronanews.ca>",
            :to => "<#{@region}@coronanews.ca>",
            :subject => "Corona Virus Breaking News",
            :template => "new_stories",
            :"h:X-Mailgun-Variables" => @template_vars
        end
    end
end
