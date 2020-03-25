class Post < ApplicationRecord
    require 'open-uri'
    require 'rubygems'
    require 'find'
    require 'json'

     # upsert records
     def self.upsert_database

        # delete all Posts currently in the table
        Post.where(:featured => true).update_all(:featured => false)

        # create all news articles from API by countries
        regions = ['ca','us','de','it','gb','fr','nl','at','ch']

        for region in regions do

             # create featured news articles
            url = "http://newsapi.org/v2/top-headlines?"\
            "q=Corona&"\
            "q=Corona Virus&"\
            "country=#{region}&"\
            "q=COVID&"\
            "q=COVID-19&"\
            "q=covid-19&"\
            "sortBy=popularity&" \
            "apiKey=764acb82041f45f7a8bc847b05da23cc"

            req = open(url)
            res = JSON.parse(req.read)

            puts 'got articles'

            # map article to table format and upsert
            for post in res['articles'] do

                if !post['content'] || !post['urlToImage']|| !post['url'] # must be a high quality link
                    next
                end

                if post['content'].length == 0 || !post['urlToImage'].length == 0 || !post['url'].length == 0 # must be a high quality link
                    next
                end

                # make a call to scraper to scrape url based on data
                system "python3 scraperCode/scrapingTools/posts_crawl.py \"#{post['content']}\" #{post['url']}"
                
                # open content.jl to see results
                @content = File.open("content.txt").read.split("}\n").map { |e| e[13..-2] }

                if @content.length < 3 # ensure quality results have been retreieved
                    next
                end

                @data = @content.join('')

                Post.find_or_create_by(
                    :title => post['title'], 
                    :author => post['author'], 
                    :body => @data,
                    :date => post['publishedAt'],
                    :headerImg => post['urlToImage'],
                    :url => post['url'],
                    :region => region,
                    :featured => false
                )
            end
        end

        # create featured posts based on date
        Post.where({ date: (Time.now.midnight - 1.day)..Time.now.midnight }).update_all(:featured => true)
    end
end
