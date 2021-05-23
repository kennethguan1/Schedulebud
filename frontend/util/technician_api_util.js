export const fetchTechnicians = () => 
  $.ajax({
    url: "/api/technicians",
    method: "GET",
  });

export const fetchTechnician = technicianId => {
  return $.ajax({
    url: `api/technicians/${technicianId}`,
    method: "GET",
  });
}

export const createTechnician = technician =>
  $.ajax({
    url: "/api/technicians",
    method: "POST",
    data: {
      technician,
    },
  });

export const updateTechnician = technician =>
  $.ajax({
    url: `/api/technicians/${technician.id}`,
    method: "PATCH",
    data: {
      technician,
    },
  });

export const deleteTechnician = technicianId =>
  $.ajax({
    url: `/api/technicians/${technicianId}`,
    method: "DELETE",
  });