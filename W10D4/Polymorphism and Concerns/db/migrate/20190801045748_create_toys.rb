class CreateToys < ActiveRecord::Migration[5.1]
  def change
    create_table :toys do |t|
      t.string :name
      t.integer :toyable_id
      t.string :toyable_type

      t.timestamps
    end
    add_index :toys, :toyable_id
  end
end
