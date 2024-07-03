FactoryBot.define do
  factory :album do
    title { Faker::Lorem.characters(number: 10) }

    # 写真添付パターン1
    after(:build) do |album|
      image_files = ['spec/fixtures/files/test_image1.jpg', 'spec/fixtures/files/test_image2.jpg', 'spec/fixtures/files/test_image3.jpg']
      image_files.each do |file|
        album.pictures.attach(
          io: File.open(Rails.root.join(file)),
          filename: File.basename(file),
          content_type: 'image/jpeg'
        )
      end
    end

    # 写真添付パターン2
    # image_files = ['spec/fixtures/files/test_image1.jpg', 'spec/fixtures/files/test_image2.jpg', 'spec/fixtures/files/test_image3.jpg']
    # pictures = image_files.map do |file|
    #   ActiveStorage::Blob.create_and_upload!(
    #     io: File.open(Rails.root.join(file)),
    #     filename: File.basename(file),
    #     content_type: 'image/jpeg'
    #   )
    # end
    # pictures { pictures }
  end
end