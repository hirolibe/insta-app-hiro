FactoryBot.define do
  factory :album do
    image_files = ['spec/fixtures/files/test_image1.jpg', 'spec/fixtures/files/test_image2.jpg', 'spec/fixtures/files/test_image3.jpg']
    pictures = image_files.map do |file|
      ActiveStorage::Blob.create_and_upload!(
        io: File.open(Rails.root.join(file)),
        filename: File.basename(file),
        content_type: 'image/jpeg'
      )
    end

    title { Faker::Lorem.characters(number: 10) }
    pictures { pictures }
  end
end