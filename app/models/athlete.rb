# == Schema Information
#
# Table name: athletes
#
#  id              :bigint(8)        not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Athlete < ApplicationRecord
    validates :email, :username, :session_token, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}

    attr_reader :password 

    after_initialize :ensure_session_token

    has_many :routes
    has_many :activities

    def self.find_by_credentials(username, password)
        user = Athlete.find_by(username: username)

        return nil unless user && user.is_password?(password)
        user
    end

    def generate_session_token
        SecureRandom.urlsafe_base64
    end

    def reset_session_token!
        self.session_token = generate_session_token
        self.save!
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def ensure_session_token
        self.session_token ||= generate_session_token
    end

end
