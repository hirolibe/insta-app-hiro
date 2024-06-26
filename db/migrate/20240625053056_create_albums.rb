class CreateAlbums < ActiveRecord::Migration[6.0]
  def change
    create_table :albums do |t|
      t.references :user, null: false
      t.string :title, null: false # 短い文字列
      t.timestamps
    end
  end
end
