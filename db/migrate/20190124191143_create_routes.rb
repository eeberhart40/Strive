class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.integer :athlete_id, null: false
      t.string :route_data, null: false

      t.timestamps
    end
    add_index :routes, :athlete_id
  end
end
