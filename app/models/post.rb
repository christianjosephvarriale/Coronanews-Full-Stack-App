class Post < ApplicationRecord
    require 'open-uri'
    require 'uri'
    require 'rubygems'
    require 'find'
    require 'json'
    require 'htmlentities'

     # upsert records
     def self.upsert_database

        # delete all Posts currently in the table
        Post.where(:featured => true).update_all(:featured => false)

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
            "sortBy=popularity&" \
            "apiKey=764acb82041f45f7a8bc847b05da23cc"

            req = open(url)
            res = JSON.parse(req.read)

            # map article to table format and upsert
            for post in res['articles'] do

                if !post['content'] || !post['urlToImage'] || !post['url'] || !post['author'] # must be a high quality link
                    next
                end

                if post['content'].length == 0 || post['urlToImage'].length == 0 || post['url'].length == 0 || post['author'].length == 0 # must be a high quality link
                    next
                end

                # make a call to scraper to scrape url based on data
                system "python3 scraperCode/scrapingTools/posts_crawl.py \"#{post['content']}\" #{post['url']}"
                
                # open content.jl to see results
                content = File.open("content.txt").read.split("}\n").map { |e| e[13..-2] }

                if content.length < 3 # ensure quality results have been retreieved
                    next
                end

                new_content = []
                title = post['title']

                if !(['ca','us','gb'].include?(region))

                    # translate title
                    @translate_title_url = "https://translate.yandex.net/api/v1.5/tr.json/translate"\
                        "?key=trnsl.1.1.20200325T224046Z.3a126b80ad81cac8.c9441f7287e8054163d09d900cd9343c32f8e91e"\
                        "&text=#{URI::encode(title)}"\
                        "&lang=en"

                    @trans_title_req = open(@translate_title_url)
                    @trans_title_res = JSON.parse(@trans_title_req.read)

                    title = @trans_title_res['text'][0]
                 
                    for tag in content do

                        @decoded_tag = JSON.parse("\"#{tag}\"")

                        # translate the text if the region is not us or ca or gb
                        @translate_url = "https://translate.yandex.net/api/v1.5/tr.json/translate"\
                        "?key=trnsl.1.1.20200325T224046Z.3a126b80ad81cac8.c9441f7287e8054163d09d900cd9343c32f8e91e"\
                        "&text=#{URI::encode(@decoded_tag)}"\
                        "&lang=en"\
                        "&[format=html]"

                        @trans_req = open(@translate_url)
                        @trans_res = JSON.parse(@trans_req.read)

                        puts @trans_res['text']
                        new_content.append(@trans_res['text'])
                    
                    end

                    puts 'heres the translated data'
                    puts new_content

                    content = new_content

                else 

                    content = content.map { |txt| JSON.parse("\"#{txt}\"") } # remove escaped strings

                end

                data = content.join('')

                Post.find_or_create_by(
                    :title => title, 
                    :author => post['author'], 
                    :body => data,
                    :date => post['publishedAt'],
                    :headerImg => post['urlToImage'],
                    :url => post['url'],
                    :region => region,
                    :source => post['source']['name'],
                    :featured => false,
                    :description => post['description']
                )
            end
        end

        # create featured posts based on date
        Post.where({ date: (Time.now.midnight - 1.day)..Time.now.midnight }).update_all(:featured => true)
    end
end
