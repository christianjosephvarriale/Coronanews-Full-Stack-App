class CommentsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /comments
  def index

    #decode the URI 
    @title = HTMLEntities.new.decode request.query_parameters['post']
    @comments = Comment.where(post: @title)
    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private
    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(:message, :name, :email, :post)
    end
end
