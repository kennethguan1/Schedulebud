# == Schema Information
#
# Table name: locations
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  city       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Location < ApplicationRecord

    validates :name, :city, presence: true

    has_many :work_orders,
        foreign_key: :location_id,
        class_name: :Workorder

end
