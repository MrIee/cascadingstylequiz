Rails.application.routes.draw do
  root :to => "pages#index"
  get "quizzes/:quiz" => "pages#quiz"
  get "quizzes/:quiz/:id" => "pages#quiz"
end
