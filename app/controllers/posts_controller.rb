class PostsController < ApplicationController
  
    require 'json'
    require 'open-uri'
    skip_before_action :verify_authenticity_token

    #  # upsert records
    #  def upsert_database

    #     # request API
    #     url = 'http://newsapi.org/v2/top-headlines?'\
    #           'q=Corona&'\
    #           'q=Corona Virus&'\
    #           'sortBy=popularity&' \
    #           'apiKey=764acb82041f45f7a8bc847b05da23cc'
    #     req = open(url)
    #     res = JSON.parse(req.read)

    #     # map article to table format and upsert
    #     for post in res['articles'] do

    #         Post.find_or_create_by(
    #             :title => post['title'], 
    #             :author => post['author'], 
    #             :body => post['content'],
    #             :date => post['publishedAt'],
    #             :headerImg => post['urlToImage'],
    #             :url => post['url']
    #         )
    #     end

    #     render json: :OK
    # end

    # GET /posts
    def index
      @posts = Post.all
      render json: @posts
    end
  
    # GET /post/1
    def show
      @post = Post.find(params[:id])
      puts @post
      render json: @post
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @post = Post.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def comment_params
        params.permit(:id, :author, :body, :date, :headerImg, :title)
      end
  end
  
