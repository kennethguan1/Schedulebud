class Api::WorkOrdersController < ApplicationController

    def index
        @work_orders = WorkOrder.all
        render "api/work_orders/index"
    end

    def show
        @work_order = WorkOrder.find(params[:id])
        if @work_order
            render "api/work_orders/show"
        else
            render json: ["Work Order not found"], status: 404
        end
    end

    def create        
        @work_order = WorkOrder.new(work_order_params)
        if @work_order.save
            render "api/work_orders/show"
        else
            render json: @work_order.errors.full_messages, status: 422
        end
    end

    def update        
        @work_order = WorkOrder.find(params[:id])
        if @work_order.update(work_order_params)
            render "api/work_orders/show"
        else
            render json: @work_order.errors.full_messages, status: 422
        end
    end

    def destroy
        @work_order = WorkOrder.find(params[:id])
        @work_order.destroy
        render json: ["Work Order deleted"]
    end

    def upload
        @upload = JSON.parse(params[:import_data])

        if @upload && @upload.length > 0
            @upload.each do |import|
                time_zone = 'Pacific Daylight Time (US & Canada)'
                
                new_params = {id: import["id"], technician_id: import["technician_id"], location_id: import["location_id"], time: DateTime.strptime(import["time"]+"#{time_zone}", '%m/%d/%y %H:%M %z'),
                                    duration: import["duration"], price: import["price"]}
            
                @work_order = WorkOrder.new(new_params)

                if !@work_order.save
                    render json: @work_order.errors.full_messages, status: 422
                    return;
                end

            end
        end
        
        render :show
    end

    def work_order_params
        params.require(:work_order).permit(:location_id, :technician_id, :time, :duration, :price)
    end

end
