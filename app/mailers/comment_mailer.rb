class CommentMailer < ApplicationMailer
  def mention(album, mentioned_user, commenter)
    @album = album
    @mentioned_user = mentioned_user
    @commenter = commenter
    mail to: mentioned_user.email, subject: '【お知らせ】アルバムにコメントがつきました'
  end
end