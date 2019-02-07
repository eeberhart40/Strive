class ChangeTimeColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :activities, :time, :string, null: false
  end
end
