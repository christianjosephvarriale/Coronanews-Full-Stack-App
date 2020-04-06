class CreateSpiders < ActiveRecord::Migration[5.2]
  def change
    create_table :spiders do |t|
      t.timestamps
    end
  end
end
