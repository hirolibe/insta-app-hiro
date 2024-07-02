# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  album_id   :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_album_id  (album_id)
#  index_comments_on_user_id   (user_id)
#
class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :album

  validates :content, presence: true

  after_create :send_email_if_mentioned

  private

  def send_email_if_mentioned
    mentioned_usernames = extract_mentions
    unless mentioned_usernames.empty?
      # メンションされた全てのユーザーにメールを送信する場合
      mentioned_users = User.where(account: mentioned_usernames)
      mentioned_users.each do |mentioned_user|
        CommentMailer.mention(album, mentioned_user, user).deliver_later
      end
    end
  end

  def extract_mentions
    content.scan(/@(\w+)/).flatten
  end
end
