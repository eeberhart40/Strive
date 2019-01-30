# == Schema Information
#
# Table name: routes
#
#  id          :bigint(8)        not null, primary key
#  athlete_id  :integer          not null
#  route_data  :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  title       :string           not null
#  description :string
#

class Route < ApplicationRecord
    validates :athlete_id, :route_data, :title, presence: true

    belongs_to :athlete 
end
