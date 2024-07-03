require 'rails_helper'

RSpec.describe "Albums", type: :request do
  let!(:user) { create(:user) }

  describe "GET /albums" do
    let!(:albums) { create_list(:album, 3, user: user) }

    it "200ステータスが返ってくる" do
      get albums_path
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /albums' do
    let(:picture1) {fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image1.jpg'), 'image/jpeg') }
    let(:picture2) {fixture_file_upload(Rails.root.join('spec/fixtures/files/test_image2.jpg'), 'image/jpeg') }

    context 'ログインしている場合' do
      before do
        sign_in user
      end

      it '記事が保存される' do
        album_params = {
          title: Faker::Lorem.characters(number: 10),
          pictures: [picture1, picture2]
        }
        post albums_path, params: { album: album_params }
        expect(response).to have_http_status(302)
        expect(Album.last.title).to eq(album_params[:title])
        expect(Album.last.pictures.count).to eq(2)
      end
    end
  end
end