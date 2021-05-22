class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :city, null: false
      t.timestamps
    end
  end
end
