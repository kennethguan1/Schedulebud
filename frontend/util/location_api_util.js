export const fetchLocations = () => 
  $.ajax({
    url: "/api/locations",
    method: "GET",
  });

export const fetchLocation = locationId => {
  return $.ajax({
    url: `api/locations/${locationId}`,
    method: "GET",
  });
}

export const createLocation = location =>
  $.ajax({
    url: "/api/locations",
    method: "POST",
    data: {
      location,
    },
  });

export const updateLocation = location =>
  $.ajax({
    url: `/api/locations/${location.id}`,
    method: "PATCH",
    data: {
      location,
    },
  });

export const deleteLocation = locationId =>
  $.ajax({
    url: `/api/locations/${locationId}`,
    method: "DELETE",
  });