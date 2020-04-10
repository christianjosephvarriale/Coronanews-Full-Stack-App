class AddColsToMetaNext < ActiveRecord::Migration[5.2]
  def change
    remove_column :meta, :world_stats
    remove_column :meta, :world_map
  end
end
