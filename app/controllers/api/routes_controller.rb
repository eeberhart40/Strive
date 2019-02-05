class Api::RoutesController < ApplicationController

    def create
        @route = Route.new(route_params)

        if @route.save
            render 'api/routes/show'
        else
            render json: @route.errors.full_messages, status: 422 
        end
    end

    def show
        @route = Route.find(params[:id])
    end

    def index
        @routes = current_user.routes
    end

    def destroy
        @route = Route.find(params[:id])
        @route.destroy
        render 'api/routes' 
    end

    private 

    def route_params
        params.require(:route).permit(:athlete_id, :route_data, :title)
    end

end
