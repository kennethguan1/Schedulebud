@work_orders.each do |work_order|
  json.set! work_order.id do
    json.partial! 'work_order', work_order: work_order 
  end
end