class CommentsController < ApplicationController
  before_action :move_to_sign_in, only: [:create, :edit]
  before_action :user_check, only: [:update, :destroy]
  
  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.create(comments_params)
    if @comment.save!
      respond_to do |format|
        format.html
        format.json
      end
      # redirect_to item_path(params[:item_id]), notice: '投稿完了'
    else
      redirect_to item_path(params[:item_id]), alert: '投稿失敗'
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    @id_comment = Comment.find(params[:id]).id
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(message: comments_params[:message])
      # @comment = Comment.find(params[:id]) 
      # @id_comment = Comment.find(params[:id]).id
    else
      render 'item_path', alert: '編集失敗'
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy 
  end

  private
  def comments_params
  	params.require(:comment).permit(:id, :message, :user_id, :item_id)
  end

  def move_to_sign_in
    redirect_to new_user_session_path unless user_signed_in?
  end

  def user_check
    comment = Comment.find(params[:id])
    redirect_to root_path, alert: '編集権限がありません' unless current_user.id == comment.user_id
  end

end
