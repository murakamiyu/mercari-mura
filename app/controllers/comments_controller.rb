class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comments_params)
    # if @comment.save
      respond_to do |format|
        format.html
        format.json
      end
      # redirect_to item_path(params[:item_id]), notice: '投稿完了'
    # else
    #   render 'item_path', alert: '投稿失敗'
    # end
  end

  def edit
  end

  def update

  end


  private
  def comments_params
  	params.require(:comment).permit(:comment, :user_id, :item_id)
  end
end
