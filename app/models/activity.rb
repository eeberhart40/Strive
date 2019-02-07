# == Schema Information
#
# Table name: activities
#
#  id          :bigint(8)        not null, primary key
#  athlete_id  :integer          not null
#  route_id    :integer          not null
#  sport       :string           not null
#  title       :string           not null
#  time        :date             not null
#  distance    :float            not null
#  elevation   :integer
#  description :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Activity < ApplicationRecord
    validates :athlete_id, :route_id, :sport, :title, :time, :distance, presence: true

    belongs_to :athlete 
    belongs_to :route 
end
