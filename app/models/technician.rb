# == Schema Information
#
# Table name: technicians
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Technician < ApplicationRecord

    validates :name, presence: true

    has_many :work_orders,
        foreign_key: :technician_id,
        class_name: :Workorder

end
