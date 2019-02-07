@activities.each do |activity|
        json.set! activity.id do 
        json.partial! activity: activity
        end
end