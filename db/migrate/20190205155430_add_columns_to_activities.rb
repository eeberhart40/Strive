class AddColumnsToActivities < ActiveRecord::Migration[5.2]
  def change
      add_column :activities, :sport, :string, null: false
      add_column :activities, :title, :string, null: false
      add_column :activities, :time, :date, null: false
      add_column :activities, :distance, :float, null: false 
      add_column :activities, :elevation, :integer
      add_column :activities, :description, :integer
      add_column :activities, :created_at, :datetime, null: false
      add_column :activities, :updated_at, :datetime, null: false
  end
end
