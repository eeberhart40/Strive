class CreateAthletes < ActiveRecord::Migration[5.2]
  def change
    create_table :athletes do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      
      t.timestamps
    end
    add_index :athletes, :email, unique: true
    add_index :athletes, :session_token, unique: true
  end
end
