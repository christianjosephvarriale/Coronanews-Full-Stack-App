class CreateMeta < ActiveRecord::Migration[5.2]
  def change
    create_table :meta do |t|
      t.string :ca_stats
      t.string :world_map
      t.string :world_stats

      t.timestamps
    end
  end
end
