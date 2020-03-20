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
      # Use callbacks to share common setup or constraints between actions.
      def set_comment
        @post = Post.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def comment_params
        params.permit(:id, :region)
      end
  end
  
