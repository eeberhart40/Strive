# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Athlete.delete_all
Route.delete_all

eric =  Athlete.create!({email: 'eric@gmail', username:'badFrank', password: 'starwars'})
wes =  Athlete.create!({email: 'wes@gmail', username:'bigWes', password: 'starwars'})
matt =  Athlete.create!({email: 'matt@gmail', username:'mamadoo', password: 'starwars'})

route1 = Route.create!({route_data: 'abc', athlete_id: eric.id})
route2 = Route.create!({route_data: 'def', athlete_id: wes.id})
route3 = Route.create!({route_data: 'ghi', athlete_id: matt.id})