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
require 'test_helper'

class WorkOrderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
