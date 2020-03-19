class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :author
      t.string :body
      t.string :date
      t.string :headerImg
      t.string :title

      t.timestamps
    end
  end
end
