class CommentsController < ApplicationController
  def create
  	  @comment = Comment.create(text: comments_params[:text], user_id: current_user.id, item_id: comments_params[:item_id] )
  	  # respond_to do |format|
  	  # 	format.html
  	  # 	format.json
  end

  private
  def comments_params
  	  params.permit(:text, :item_id)
  end

end
