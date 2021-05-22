class CreateWorkOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :work_orders do |t|
      t.datetime :time
      t.integer :duration
      t.integer :price
      t.integer :technician_id
      t.integer :location_id
      t.timestamps
    end
    add_index :work_orders, :technician_id
    add_index :work_orders, :location_id
  end
end
