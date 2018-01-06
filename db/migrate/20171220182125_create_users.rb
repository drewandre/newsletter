class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :name, null: false
      t.string :zipcode
      t.string :category
      t.string :top_artist_ids, array: true
      t.string :top_genres, array: true
      t.integer :age, null: false

      t.timestamps null: false
    end
  end
end
