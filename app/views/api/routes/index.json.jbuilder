
@routes.each do |route|
        json.set! route.id do 
        json.extract! route, :id, :athlete_id, :route_data, :title, :description
        end
end