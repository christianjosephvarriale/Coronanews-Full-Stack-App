class AddSourceToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :subscribers, :source, :string
  end
end
