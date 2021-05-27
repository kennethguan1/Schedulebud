class Api::LocationsController < ApplicationController

    def index
        @locations = Location.all
        render "api/locations/index"
    end

    def show
        @location = Location.find(params[:id])
        if @location
            render "api/locations/show"
        else
            render json: ["Location not found"], status: 404
        end
    end

    def create        
        @location = Location.new(location_params)
        if @location.save
            render "api/locations/show"
        else
            render json: @location.errors.full_messages, status: 422
        end
    end

    def update        
        @location = Location.find(params[:id])
        if @location.update(location_params)
            render "api/locations/show"
        else
            render json: @location.errors.full_messages, status: 422
        end
    end

    def destroy
        @location = Location.find(params[:id])
        @location.destroy
        render json: ["Location deleted"]
    end

    def upload
        @upload = JSON.parse(params[:upload_data])

        if @upload.length > 0
            @upload.each do |object|
                
                new_params = {id: object["id"], name: object["name"], city: object["city"]}
            
                @location = Location.new(new_params)

                if !@location.save
                    render json: @location.errors.full_messages, status: 422
                    return;
                end
            end
        end

        render :show
    end

    def location_params
        params.require(:location).permit(:name, :city)
    end

end