@technicians.each do |technician|
  json.set! technician.id do
    json.partial! 'technician', technician: technician 
  end
end