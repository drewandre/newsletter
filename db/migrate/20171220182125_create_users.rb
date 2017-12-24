class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :full_name, null: false
      t.string :zipcode, null: false
      t.string :category, null: false
      t.integer :age, null: false

      t.timestamps null: false
    end
  end
end
