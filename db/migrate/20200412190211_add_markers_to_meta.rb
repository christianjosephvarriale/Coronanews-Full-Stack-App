class AddMarkersToMeta < ActiveRecord::Migration[5.2]
  def change
    add_column :meta, :markers, :text
  end
end
