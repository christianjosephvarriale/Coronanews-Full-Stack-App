class AddColsToMeta < ActiveRecord::Migration[5.2]
  def change
    remove_column :meta, :ca_stats
  end
end
