class RenameCommentColumnCommentToMessage < ActiveRecord::Migration[5.0]
  def change
  	rename_column :comments, :comment, :message 
  end
end
