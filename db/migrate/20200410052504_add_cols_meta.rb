class AddColsMeta < ActiveRecord::Migration[5.2]
  def change
    add_column :meta, :world_stats, :text
    add_column :meta, :world_map, :text
    add_column :meta, :ca_stats, :text
  end
end
