import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../features/OrderSlice';
import { fetchUserById } from '../../features/LoginSlice';
import { fetchBookById } from '../../features/BookSlice';
import { Spinner, Alert, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.order);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);

  // State local pour les détails des livres
  const [bookDetails, setBookDetails] = useState([]);
  // State local pour l'adresse de l'utilisateur
  const [userAddress, setUserAddress] = useState(null); // Utilisation d'un seul objet pour l'adresse

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id)).then((action) => {
        if (action.payload && action.payload.userId) {
          dispatch(fetchUserById(action.payload.userId)).then((userAction) => {
            if (userAction.payload && userAction.payload.addressDTOS && userAction.payload.addressDTOS.length > 0) {
              setUserAddress(userAction.payload.addressDTOS[0]); // Sélection de la première adresse
            }
          });
        }
        if (action.payload && action.payload.orderDetailDTOS) {
          action.payload.orderDetailDTOS.forEach((detail) => {
            dispatch(fetchBookById(detail.bookId)).then((bookAction) => {
              if (bookAction.payload) {
                setBookDetails((prevDetails) => [
                  ...prevDetails,
                  {
                    id: bookAction.payload.id,
                    title: bookAction.payload.title,
                    image: bookAction.payload.image,
                    price: bookAction.payload.price,
                    quantity: detail.quantity,
                  },
                ]);
              }
            });
          });
        }
      });
    }
  }, [dispatch, id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erreur : {error}</Alert>;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Détails de la commande #{order.id}</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Informations sur la commande</h5>
          <p>Date de commande : {new Date(order.orderDate).toLocaleString()}</p>
          <p>Statut : {order.status}</p>
          <p>Montant total : {order.totalAmount.toFixed(2)} €</p>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Informations sur l'utilisateur</h5>
          {user ? (
            <div>
              <p>Nom : {user.name}</p>
              <p>Email : {user.email}</p>
              <p>Téléphone : {user.phone}</p>
              <p>Adresse :</p>
              {userAddress ? (
                <p>{userAddress.number} {userAddress.street}, {userAddress.town}, {userAddress.code}, {userAddress.country}</p>
              ) : (
                <p>Aucune adresse disponible.</p>
              )}
            </div>
          ) : (
            <Spinner animation="border" />
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Livres commandés</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Titre</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
              </tr>
            </thead>
            <tbody>
              {bookDetails.map((detail, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`/${detail.image}`}
                      alt={detail.title}
                      style={{ width: '100px', height: 'auto' }}
                    />
                  </td>
                  <td>{detail.title}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.price} €</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
