
@activities.each do |activity|
        json.set! activity.id do 
        json.partial! 'api/activities/activities', activity: activity
        end
end