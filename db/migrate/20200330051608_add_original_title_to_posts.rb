class AddOriginalTitleToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :original_title, :string
  end
end
