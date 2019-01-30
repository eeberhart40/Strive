class ChangeTitleColumn < ActiveRecord::Migration[5.2]
  def change
    change_column :routes, :title, :string, null: false
  end
end
