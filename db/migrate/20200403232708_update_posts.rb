class UpdatePosts < ActiveRecord::Migration[5.2]
  def change
    remove_column :posts, :description
    remove_column :posts, :original_title
    remove_column :posts, :video
    add_column :posts, :sentiment, :string
    add_column :posts, :relevance, :string
  end
end
