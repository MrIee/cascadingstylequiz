class PagesController < ApplicationController
    def index
    end

    def quiz
        @quizTitle = params[:quiz]
        @quizId = params[:id]

        js :quizTitle => @quizTitle, :quizLevel => @quizId

        if !@quizId
            redirect_to "/quizzes/#{@quizTitle}/1"
        else
            render :quiz
        end
    end
end
