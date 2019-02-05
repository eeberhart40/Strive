class AddRouteAndAthleteIndexToActivities < ActiveRecord::Migration[5.2]
  def change
    add_index :activities, :route_id
    add_index :activities, :athlete_id
  end
end
