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


    def technician_params
        params.require(:technician).permit(:name)
    end

end
