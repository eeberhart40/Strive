class Api::AthletesController < ApplicationController

    def create
        @user = Athlete.new(user_params)

        if @user.save
            login(@user)
            render 'api/athletes/show'
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show
        @user = Athlete.find(params[:id])
    end

    private

    def user_params
        params.require(:athlete).permit(:email, :username, :password)
    end

end
