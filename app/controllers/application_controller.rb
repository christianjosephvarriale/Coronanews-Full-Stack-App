class ApplicationController < ActionController::Base

    def fallback_index_html
        render :file => 'public/index.html'
    end

    def meta
        render json: Meta.first
    end
end