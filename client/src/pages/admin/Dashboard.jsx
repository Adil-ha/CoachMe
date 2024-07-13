import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus, deleteOrder } from "../../features/OrderSlice";
import { fetchAllCoachingRequests, updateCoachingRequestStatus, deleteCoachingRequest } from "../../features/RequestCoachingSlice";
import { FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orders);
  const coachingRequests = useSelector((state) => state.coachingRequests.coachingRequests);

  useEffect(() => {
    dispatch(fetchAllOrders());
    dispatch(fetchAllCoachingRequests());
  }, [dispatch]);

  const handleOrderStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }))
      .then(() => {
        dispatch(fetchAllOrders());
        toast.success("Le statut de la commande a été mis à jour avec succès !");
      })
      .catch((error) => {
        toast.error("Échec de la mise à jour du statut de la commande.");
      });
  };

  const handleCoachingRequestStatusChange = (requestId, newStatus) => {
    dispatch(updateCoachingRequestStatus({ id: requestId, status: newStatus }))
      .then(() => {
        dispatch(fetchAllCoachingRequests());
        toast.success("Le statut de la demande de coaching a été mis à jour avec succès !");
      })
      .catch((error) => {
        toast.error("Échec de la mise à jour du statut de la demande de coaching.");
      });
  };

  const handleDeleteOrder = (orderId) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette commande ?");
    if (confirmed) {
      dispatch(deleteOrder(orderId))
        .then(() => {
          toast.success("La commande a été supprimée avec succès !");
        })
        .catch((error) => {
          toast.error("Échec de la suppression de la commande.");
        });
    }
  };

  const handleDeleteCoachingRequest = (requestId) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette demande de coaching ?");
    if (confirmed) {
      dispatch(deleteCoachingRequest(requestId))
        .then(() => {
          toast.success("La demande de coaching a été supprimée avec succès !");
        })
        .catch((error) => {
          toast.error("Échec de la suppression de la demande de coaching.");
        });
    }
  };

  const handleOrderViewDetails = (id) => {
    navigate(`/AdminOrderDetail/${id}`)
  };

  const handleRequestViewDetails = (id) => {
    navigate(`/AdminRequestCoachingDetail/${id}`)
  };

  return (
    <div className="container mt-5">
      <section>
        <h2>Orders</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                  >
                    <option value="PENDING">En attente</option>
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="DELIVERED">Livré</option>
                  </select>
                </td>
                <td>{order.totalAmount.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleOrderViewDetails(order.id, 'order')}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Coaching Requests</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Request Date Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coachingRequests && coachingRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.type}</td>
                <td>{new Date(request.requestDateTime).toLocaleString()}</td>
                <td>
                  <select
                    className="form-select"
                    value={request.status}
                    onChange={(e) => handleCoachingRequestStatusChange(request.id, e.target.value)}
                  >
                    <option value="PENDING">En attente</option>
                    <option value="CONFIRMED">Confirmer</option>
                    <option value="CANCELED">Annuler</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleRequestViewDetails(request.id, 'coaching request')}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCoachingRequest(request.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;

