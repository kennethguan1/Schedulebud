class Api::TechniciansController < ApplicationController

    def index
        @technicians = Technician.all
        render "api/technicians/index"
    end

    def show
        @technician = Technician.find(params[:id])
        if @technician
            render "api/technicians/show"
        else
            render json: ["Technician not found"], status: 404
        end
    end

    def create        
        @technician = Technician.new(technician_params)
        if @technician.save
            render "api/technicians/show"
        else
            render json: @technician.errors.full_messages, status: 422
        end
    end

    def update        
        @technician = Technician.find(params[:id])
        if @technician.update(technician_params)
            render "api/technicians/show"
        else
            render json: @technician.errors.full_messages, status: 422
        end
    end

    def destroy
        @technician = Technician.find(params[:id])
        @technician.destroy
        render json: ["Technician deleted"]
    end

    def upload
        @upload = JSON.parse(params[:upload_data])

        if @upload.length > 0
            @upload.each do |object|
                
                new_params = {id: object["id"], name: object["name"]}
            
                @technician = Technician.new(new_params)

                if !@technician.save
                    render json: @technician.errors.full_messages, status: 422
                return;
                end
            end
        end
        
        render :show
    end

    def technician_params
        params.require(:technician).permit(:name)
    end

end