class Api::ActivitiesController < ApplicationController

    def create
        @activity = Activity.new(activity_params)

        if @activity.save
            render 'api/activities/show'
        else 
            render json: ["Route, Title, Duration, Distance required"], status: 422
        end
    end

    def index
        @activities = Activity.all
        # change this to just see the current users activities once done testing
        # @activities = current_user.activities
    end

    def show 
        @activity = Activity.find(params[:id])
    end

    def update
        @activity = current_user.activities.find(params[:id])
        if @activity.update_attributes(activity_params)
            render 'api/activities/show'
        else
            render json: @activity.errors.full_messages, status: 422
        end
    end

    def destroy
        @activity = Activity.find(params[:id])
        @activity.destroy
        render json: ["Activity successfully removed"], status: 200
    end
    
    private
    def activity_params
        params.require(:activity).permit(:athlete_id, :route_id, :title, :sport, :time, :distance)
    end
end
