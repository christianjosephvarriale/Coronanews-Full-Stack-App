class Subscriber < ApplicationRecord
    require 'json'

    # sends out 24 hour breaking news to mailing lists 
    def self.mail_subscribers
        
        # if date - date.now < 24 hrs, mail out post data      
        @all_posts = Post.where({ date: (Time.now.midnight - 1.day)..Time.now.midnight }).where.not(headerImg: [nil, ""])

        @formatted_all_posts = @all_posts.map do |post|

            if post.title.length > 100
                title = post.title[0..100] + '...'
            else
                title = post.title
            end
            { :img => post.headerImg, :title => title, :author => post.author, :url => post.url }
        end

        @template_all_vars = { :countries => 'all', :date => Time.zone.now.to_date, :posts => @formatted_all_posts }.to_json

        RestClient.post "https://api:3a4318a091b6de45cc9cfec15cdf835b-9a235412-c98b79b9"\
		"@api.mailgun.net/v3/coronanews.ca/messages",
		:from => "Corona News <news@coronanews.ca>",
		:to => "<all@coronanews.ca>",
		:subject => "Corona Virus Updates All Countries",
        :template => "new_stories",
        :"h:X-Mailgun-Variables" => @template_all_vars

        regions = ['ca','us','de','it','gb','fr','nl','at','ch']

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
    
            @template_vars = { :countries => @region, :date => Time.zone.now.to_date, :posts => @formatted_posts }.to_json

            RestClient.post "https://api:3a4318a091b6de45cc9cfec15cdf835b-9a235412-c98b79b9"\
            "@api.mailgun.net/v3/coronanews.ca/messages",
            :from => "Corona News <news@coronanews.ca>",
            :to => "<%s@coronanews.ca>" % @region,
            :subject => "Corona Virus Updates %s" % @region,
            :template => "new_stories",
            :"h:X-Mailgun-Variables" => @template_vars
        end
    end
end
