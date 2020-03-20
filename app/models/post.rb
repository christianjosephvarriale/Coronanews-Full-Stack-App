class Post < ApplicationRecord
    require 'open-uri'

     # upsert records
     def self.upsert_database

        # delete all Posts currently in the table
        Post.where(:featured => true).destroy_all

        # create all news articles from API by countries
        regions = ['ca','us','de','it','gb','fr','nl','at','ch']

        for region in regions do

             # create featured news articles
            url = 'http://newsapi.org/v2/top-headlines?'\
            'q=Corona&'\
            'q=Corona Virus&'\
            'country=%s&'\
            'q=COVID&'\
            'q=COVID-19&'\
            'q=covid-19&'\
            'sortBy=popularity&' \
            'apiKey=764acb82041f45f7a8bc847b05da23cc' % region
            req = open(url)
            res = JSON.parse(req.read)

            # map article to table format and upsert
            for post in res['articles'] do

                Post.find_or_create_by(
                    :title => post['title'], 
                    :author => post['author'], 
                    :body => post['content'],
                    :date => post['publishedAt'],
                    :headerImg => post['urlToImage'],
                    :url => post['url'],
                    :region => region,
                    :featured => false
                )
            end

            # randomly create 3 featured posts
            Post.where(region: region).order("RANDOM()").limit(3).update_all(:featured => true)
        end
    end
end
