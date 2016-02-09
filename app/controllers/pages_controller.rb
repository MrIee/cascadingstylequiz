class PagesController < ApplicationController
    def index
    end

    def quiz
        @quizTitle = params[:quiz]

        if !@quizId = params[:id]
            redirect_to "/quizzes/#{@quizTitle}/1"
        end

        js :quizTitle => @quizTitle
    end
end
