class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comments_params)
    if @comment.save
      redirect_to :root, notice: '投稿完了'
    else
      redirect_to :root, alert: '投稿失敗'
    end
    # respond_to do |format|
  	  # 	format.html
  	  # 	format.json
  end

  private
  def comments_params
  	params.require(:comment).permit(:comment, :user_id, :item_id)
  end
end
