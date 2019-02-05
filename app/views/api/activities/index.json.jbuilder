@activities.each do |activity|
        json.set! activity.id do 
        json.extract! activity, :id, :athlete_id, :route_id, :created_at, :title, :description, :time, :distance, :elevation 
        end
end