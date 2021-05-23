export const fetchWorkOrders = () => 
  $.ajax({
    url: "/api/work_orders",
    method: "GET",
  });

export const fetchWorkOrder = workorderId => {
  return $.ajax({
    url: `api/work_orders/${workorderId}`,
    method: "GET",
  });
}

export const createWorkOrder = workorder =>
  $.ajax({
    url: "/api/work_orders",
    method: "POST",
    data: {
      workorder,
    },
  });

export const updateWorkOrder = workorder =>
  $.ajax({
    url: `/api/work_orders/${workorder.id}`,
    method: "PATCH",
    data: {
      workorder,
    },
  });

export const deleteWorkOrder = workorderId =>
  $.ajax({
    url: `/api/work_orders/${workorderId}`,
    method: "DELETE",
  });