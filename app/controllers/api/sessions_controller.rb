class Api::SessionsController < ApplicationController

    def create
        @user = Athlete.find_by_credentials(
            params[:athlete][:username],
            params[:athlete][:password]
        )

        if @user
            login(@user)
            render 'api/athletes/show'
        else
            render json: ["Invalid username and/or password"], status: 401 
        end
    end

    def destroy
        @user = current_user
        if @user 
            logout
            render 'api/athletes/show'
        else
            render json: ['no current user'], status: 404
        end
        
    end
end
