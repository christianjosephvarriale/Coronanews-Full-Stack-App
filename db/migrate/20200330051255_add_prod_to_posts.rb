class AddProdToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :production, :boolean
  end
end
