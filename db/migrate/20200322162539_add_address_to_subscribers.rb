class AddAddressToSubscribers < ActiveRecord::Migration[5.2]
  def change
    add_column :subscribers, :address, :string
    remove_column :subscribers, :email
  end
end
