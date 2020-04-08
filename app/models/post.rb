class Post < ApplicationRecord
    require 'open-uri'
    require 'uri'
    require 'rubygems'
    require 'find'
    require 'json'
    require 'htmlentities'
    require 'contentful/management'

    def self.update_sitemap

        # delete current sitemap
        begin
            File.open('public/sitemap.xml', 'r') do |f|
              # do something with file
              File.delete(f)
            end
          rescue Errno::ENOENT
        end

        posts = Post.all

        builder = Nokogiri::XML::Builder.new do |xml|
            xml.urlset("xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9") {
                posts.each do |p|
                    xml.url {
                        xml.loc "https://coronanews.ca/coronavirus/news/canada/#{p.title.gsub(/\./,'&#46;')}"
                        xml.lastmod  p.date
                        xml.changefreq 'daily'
                    }
                end
            }
        end
        
        # delete current sitemap
        begin
            File.open('public/sitemap.xml', 'w') do |f|
              f.puts builder.to_xml
            end
          rescue Errno::ENOENT
        end

    end

    # # upsert records
    # def self.sync_database

    #     # make all posts currently featured no longer featured
    #     Post.where(:featured => true).update_all(:featured => false)

    #     client = Contentful::Client.new(
    #         space: '5zy76n4olg5p',
    #         access_token: 'yln9S1YCj8AIS5nH2VqxkQHma2xYmn4n7qRwVviHT2s',
    #         environment: 'master',  # Optional - defaults to 'master'.
    #         dynamic_entries: :auto  # Enables Content Type caching.
    #     )

    #     if ENV['RAILS_ENV'] == 'production' # sync articles based on env
    #         articles = client.entries( :content_type => 'article' ).select { |article| article.fields[:production] }
    #     else 
    #         articles = client.entries( :content_type => 'article' ).select { |article| !(article.fields[:production] ) }
    #     end

    #     articles.each do |article|

    #         found_article = Post.find_or_create_by(
    #             :id => article.raw['sys']['id']
    #         )

    #         found_article.update(
    #             :title => article.raw['fields']['title'],
    #             :tags => article.raw['fields']['tags'],
    #             :headerImg => article.raw['fields']['headerImg'],
    #             :production => article.raw['fields']['production'],
    #             :author => article.raw['fields']['author'],
    #             :source => article.raw['fields']['source'],
    #             :region => article.raw['fields']['region'],
    #             :date => article.raw['fields']['date'],
    #             :sentiment => article.raw['fields']['sentiment'],
    #             :relevance => article.raw['fields']['relevance'],
    #         ) 
    #     end

    #     if ENV['RAILS_ENV'] == 'production' # cleanup articles based on env
    #         Post.where( :production => false ).destroy_all
    #     else 
    #         Post.where( :production => true ).destroy_all
    #     end

    #     # create featured posts based on date
    #     Post.where({ date: (Time.now.midnight - 2.day)..Time.now.midnight }).update_all(:featured => true)
    # end

    # create records and save to database and in contentful
    def self.create_posts

        # client = Contentful::Management::Client.new('CFPAT-t9gxR1h3sYFgKHa2ijbfs_fYUHpH9t6_dgGrWukkSMM')
        # env = client.environments('5zy76n4olg5p').find('master')

        # create news articles    
        posts = JSON.parse(RestClient.post("http://eventregistry.org/api/v1/article/getArticles", {
            "keyword": ["covid-19","coronavirus","coronavirus policy","policy","tips","coronavirus tips","coronavirus spread","spread rates", "death rates"],
            "keywordOper": "or",
            "articlesSortBy": "rel",
            "articlesCount": 200,
            "sourceUri":["cbc.ca","torontosun.com","metronews.ca","toronto.ctvnews.ca","huffingtonpost.com","Globalnews.ca","nationalpost.com","cp24.com","journaldemontreal.com","montrealgazette.com", "winnipegfreepress.com" ],
            "articlesArticleBodyLen": -1,
            "resultType": "articles",
            "dataType": ["news", "pr"],
            "apiKey": "19f5c0d9-47b5-4252-9f55-0948854c2362",
            "forceMaxDataTimeWindow": 31  
        }.to_json, {content_type: :json}))

        # map article to table format and upsert
        for post in posts['articles']['results'] do

            Post.find_or_create_by( 
                :title => post['title'],
                :author => post['source']['title'], 
                :date => post['dateTimePub'],
                :url => post['url'],
                :region => 'ca',
                :source => post['source']['title'],
                :body => post['body'],
                :relevance => post['relevance'],
                :sentiment => post['sentiment'],
                :headerImg => post['image'],
            )
        end
    end
end
