class AddSourceToPostsFix < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :source, :string
    remove_column :subscribers, :source
  end
end
