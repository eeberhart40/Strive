class AddRouteIdAndAthleteIdToActivities < ActiveRecord::Migration[5.2]
  def change
    add_column :activities, :athlete_id, :integer, null: false
    add_column :activities, :route_id, :integer, null: false
  end
end
