require 'rails_helper'

RSpec.describe 'Album', type: :system do
  let!(:user1) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:albums) { create_list(:album, 3, user: user1) }

  it 'アルバム一覧が表示される' do
    visit root_path
    albums.each do |album|
      expect(page).to have_css('.card_detail_title', text: album.title)
    end
  end

  context 'ログインしている場合' do
    before do
      sign_in user2
    end

    it 'コメント入力フォームが表示される' do
      visit root_path
      all('img[src*="comment-"]')[0].click
      binding.pry
      expect(page).to have_css('.show-comment-form')
    end
  end

  context 'ログインしていない場合' do
    it 'コメント入力フォームが表示されない' do
      visit root_path
      all('img[src*="comment-"]')[0].click
      expect(page).not_to have_css('.show-comment-form')
    end
  end
end