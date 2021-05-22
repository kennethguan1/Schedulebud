# == Schema Information
#
# Table name: work_orders
#
#  id            :bigint           not null, primary key
#  time          :datetime
#  duration      :integer
#  price         :integer
#  technician_id :integer
#  location_id   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class WorkOrder < ApplicationRecord

    validates :time, :duration, :price, :technician_id, :location_id, presence: true

    belongs_to :location,
        class_name: :Location

    belongs_to :technician,
        class_name: :Technician

end
