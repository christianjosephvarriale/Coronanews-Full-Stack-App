class AddRegionToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :region, :string
  end
end
