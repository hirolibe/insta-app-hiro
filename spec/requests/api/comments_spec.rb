require 'rails_helper'

RSpec.describe "Api::Comments", type: :request do
  let!(:user1) { create(:user) }
  let!(:user2) { create(:user) }
  let!(:album) { create(:album, user: user1) }

  describe "GET /api/comments" do
    let!(:comments) { create_list(:comment, 3, album: album, user: user2 ) }

    it "200 Status" do
      get api_comments_path(album_id: album.id)
      expect(response).to have_http_status(200)
      body = JSON.parse(response.body)
      expect(body.length).to eq 3
      expect(body[0]['content']).to eq comments.first.content
      expect(body[1]['content']).to eq comments.second.content
      expect(body[2]['content']).to eq comments.third.content
    end
  end

  describe "POST /api/comments" do

    context 'ログインしている場合' do
      before do
        sign_in user2
      end

      it 'コメントが保存される' do
        comment_params = { content: Faker::Lorem.characters(number: 100) }
        post api_comments_path(album_id: album.id), params: { comment: comment_params }
        binding.pry
        expect(response).to have_http_status(200)
        expect(Comment.last.content).to eq(comment_params[:content])
      end
    end
  end
end
