require 'rails_helper'

RSpec.describe Album, type: :model do
  let!(:user) { create(:user) }

  context 'タイトルと写真が入力されている場合' do
    let!(:album) { build(:album, user: user) }

    it 'アルバムを保存できる' do
      expect(album).to be_valid
      expect(album.save).to be true
      expect(album.pictures.attached?).to be true
      expect(album.pictures.count).to eq(3)
    end
  end

  context 'タイトルが入力されていない場合' do
    let!(:album) { build(:album, title: "", user: user) }

    before do
      album.save
    end

    it '記事を保存できない' do
      expect(album.errors.messages[:title][0]).to eq("can't be blank")
    end
  end
end