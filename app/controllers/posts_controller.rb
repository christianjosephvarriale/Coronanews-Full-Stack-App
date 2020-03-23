class PostsController < ApplicationController
    require 'json'
    skip_before_action :verify_authenticity_token

    # GET /posts
    def index
      @posts = Post.all
      render json: @posts
    end
  
    # GET /post/1
    def show
      @posts = Post.where({ region: params[:region] })
      render json: @posts
    end
  
    private
      # Only allow a trusted parameter "white list" through.
      def post_params
        params.permit(:id, :region)
      end
  end
  
