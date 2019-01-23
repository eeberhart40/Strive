class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper_method :current_user, :logged_in?

    private

    def login(user)
        user.reset_session_token!
        session[:session_token] = user.session_token
        @current_user = user
    end

    def current_user
    
        return nil unless session[:session_token]
        @current_user ||= Athlete.find_by_session_token(session[:session_token])
    end

    def require_logged_in
        render json: { base: ['invalid username and/or password'] }, status: 401
    end

    def logged_in?
        !!current_user
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
    end


end
