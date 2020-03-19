class Post < ApplicationRecord
    require 'open-uri'

     # upsert records
     def upsert_database

        # request API
        url = 'http://newsapi.org/v2/top-headlines?'\
              'q=Corona&'\
              'q=Corona Virus&'\
              'sortBy=popularity&' \
              'apiKey=764acb82041f45f7a8bc847b05da23cc'
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
                :url => post['url']
            )
        end

        render json: :OK
    end
end
