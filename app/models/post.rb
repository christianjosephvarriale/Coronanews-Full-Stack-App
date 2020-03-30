class Post < ApplicationRecord
    require 'open-uri'
    require 'uri'
    require 'rubygems'
    require 'find'
    require 'json'
    require 'htmlentities'
    require 'contentful/management'

    # upsert records
    def self.update_database

        # make all posts currently featured no longer featured
        Post.where(:featured => true).update_all(:featured => false)

        @client = Contentful::Client.new(
            space: '5zy76n4olg5p',
            access_token: 'yln9S1YCj8AIS5nH2VqxkQHma2xYmn4n7qRwVviHT2s',
            environment: 'master',  # Optional - defaults to 'master'.
            dynamic_entries: :auto  # Enables Content Type caching.
        )

        if ENV['RAILS_ENV'] == 'production'
            articles = @client.entries( :content_type => 'article' ).select { |article| article.fields[:production] }
        else 
            articles = @client.entries( :content_type => 'article' ).select { |article| !(article.fields[:production] ) }
        end

        articles.each do |article|
            Post.find_by(:id => article.raw['sys']['id']).update(
                :title => article.raw['fields']['title'],
                :tags => article.raw['fields']['tags'],
                :description => article.raw['fields']['description'],
                :headerImg => @client.asset(article.raw['fields']['headerImg']['sys']['id']).image_url
            ) 
        end

        # create featured posts based on date
        Post.where({ date: (Time.now.midnight - 2.day)..Time.now.midnight }).update_all(:featured => true)
    end

    # create records in contentful
    def self.create_contentful

        client = Contentful::Management::Client.new('CFPAT-t9gxR1h3sYFgKHa2ijbfs_fYUHpH9t6_dgGrWukkSMM')
        env = client.environments('5zy76n4olg5p').find('master')

        # create all news articles from API by countries
        regions = ['fr','it','nl','at','ch','de','ca','us','gb',]

        for region in regions do

             # create featured news articles
            url = "http://newsapi.org/v2/top-headlines?"\
            "q=Corona&"\
            "q=Corona Virus&"\
            "country=#{region}&"\
            "q=COVID&"\
            "q=COVID-19&"\
            "q=covid-19&"\
            "apiKey=764acb82041f45f7a8bc847b05da23cc"

            req = open(url)
            res = JSON.parse(req.read)

            # map article to table format and upsert
            for post in res['articles'] do

                @upserted_post = Post.find_or_create_by(
                    :original_title => post['title']
                )

                if !@upserted_post.nil? # create the entry in Contentful

                    # first create the remaining fields
                    @upserted_post.update(
                        :author => post['author'], 
                        :date => post['publishedAt'],
                        :url => post['url'],
                        :region => region,
                        :source => post['source']['name'],
                        :featured => false,
                        :production => false,
                    )

                    article = env.content_types.find('article')

                    entry = article.entries.create(
                        :id => @upserted_post.id,
                        :url => @upserted_post.url,
                        :title => @upserted_post.title,
                        :description => @upserted_post.description
                    )
                end
            end
        end
    end
end
