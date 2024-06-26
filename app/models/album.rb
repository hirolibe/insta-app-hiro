# == Schema Information
#
# Table name: albums
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_albums_on_user_id  (user_id)
#
class Album < ApplicationRecord
  has_many_attached :pictures

  belongs_to :user

  validates :title, presence: true
  # validates :pictures, presence: true
end
