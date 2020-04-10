class PostsController < ApplicationController
    require 'json'
    require 'contentful'
    require 'htmlentities'
    require 'contentful'
    skip_before_action :verify_authenticity_token

    # GET all posts
    def index
      srt_pos = ( params[:page].to_i - 1 ) * 12
      end_pos = srt_pos + 11
      @posts = Post.all.order(created_at: :desc)[srt_pos..end_pos]
      render json: { posts: @posts, length: Post.all.length } 
    end

    # GET posts where region is params[:region]
    def show_region
        srt_pos = ( params[:page].to_i - 1 ) * 12
        end_pos = srt_pos + 11  
        puts srt_pos
        puts end_pos
        @posts = Post.where( region: params[:region] ).order(created_at: :desc)[srt_pos..end_pos]
        render json: { posts: @posts, length: Post.all.length }
    end
  
    # GET post by unique title, and return the last and next post
    def show_post

      #decode the URI if needed
      @title = HTMLEntities.new.decode params[:title]

      puts @title

      @post = Post.find_by title: @title
      @prevPost = Post.find_by id: @post.id - 1
      @nextPost = Post.find_by id: @post.id + 1
      
      render json:  { :post => @post, :prevPost => @prevPost, :nextPost => @nextPost } 
    end
  
    private
      # Only allow a trusted parameter "white list" through.
      def post_params
        params.permit(:id, :region, :title, :page)
      end
  end
  
