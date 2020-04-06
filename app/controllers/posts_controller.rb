class PostsController < ApplicationController
    require 'json'
    require 'contentful'
    require 'htmlentities'
    require 'contentful'
    skip_before_action :verify_authenticity_token

    # GET all posts
    def index
      @posts = Post.all
      render json: @posts
    end

    # GET posts where region is params[:region]
    def show_region
        @posts = Post.where( region: params[:region] )
        render json: @posts
    end
  
    # GET post by unique title, and return the last and next post
    def show_post

      #decode the URI if needed
      @title = HTMLEntities.new.decode params[:title]

      @post = Post.find_by title: @title
      @prevPost = Post.find_by id: @post.id - 1
      @nextPost = Post.find_by id: @post.id + 1
      
      render json:  { :post => @post, :prevPost => @prevPost, :nextPost => @nextPost } 
    end
  
    private
      # Only allow a trusted parameter "white list" through.
      def post_params
        params.permit(:id, :region, :title)
      end
  end
  
