# Strive
[Live Demo](https://strive-a.herokuapp.com/#/)

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/favicon.png" width="300">

## Features
* User Authentication
  * User login/Signup
  * Demo User
 * Create/Save biking or running routes
 * Create/Record Activities
 
## Technologies Used
* **Google Maps and Directions Service API** to plot routes
* **PostgresQL** for the database
* **Ruby on Rails** for the backend framework
* **React** for the Frontend with **Redux** to manage state
* **jQuery** AJAX for accessing the backend through **Thunk** actions
* **SASS/CSS** for styling

## Implementation
### Creating Routes
User marks origin and destination waypoints on a globe-spanning, searchable map. Strive generates a route and calculates the distance and estimated travel time depending on mode of travel
<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/new_route.png" width="600">

The save route modal pops up prompting the user to enter a name for the route

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/save_route.png" width="600">

Upon saving, the user is directed to the route's show page

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/show_route.png" width="600">

##
<img src="https://media.giphy.com/media/8w91I0pZSsDhi9YNcE/giphy.gif" width="480" height="380">

##

### Recording Actvitities
User chooses a route with which they performed an activity

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/choose_route.png" width="600">

Modal pops up, prompting user to enter the duration of their activity and a title

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/activty_modal.png" width="600">

Upon Saving, the user is directed to the activity's show page displaying the distance traveled, duration and average speed

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/activity_show.png" width="600">

User's activity feed updates with their most recent activity

<img src="https://github.com/eeberhart40/Strive/blob/master/app/assets/images/feed_show.png" width="600">

