import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoachingRequestById } from '../../features/RequestCoachingSlice';
import { fetchUserById } from '../../features/LoginSlice';
import { fetchPerformanceById } from '../../features/PerformanceSlice';
import { Spinner, Alert, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminRequestCoachingDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const coachingRequest = useSelector((state) => state.coachingRequests.coachingRequest);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.coachingRequests.loading);
  const error = useSelector((state) => state.coachingRequests.error);
  const performance = useSelector((state) => state.performances.performance);

  // State local pour l'adresse de l'utilisateur
  const [userAddress, setUserAddress] = useState(null);
  const [performanceError, setPerformanceError] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchCoachingRequestById(id)).then((action) => {
        console.log("Coaching request fetched:", action.payload);
        if (action.payload && action.payload.userId) {
          dispatch(fetchUserById(action.payload.userId)).then((userAction) => {
            if (userAction.payload && userAction.payload.addressDTOS && userAction.payload.addressDTOS.length > 0) {
              setUserAddress(userAction.payload.addressDTOS[0]); // Sélection de la première adresse
            }
          });
        }
        if (action.payload && action.payload.performanceId) {
          dispatch(fetchPerformanceById(action.payload.performanceId)).then((performanceAction) => {
            if (performanceAction.error) {
              setPerformanceError(performanceAction.error.message);
            }
            console.log("Performance fetched:", performanceAction.payload);
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

  if (!coachingRequest) {
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Détails de la demande de coaching #{coachingRequest.id}</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Informations sur la demande de coaching</h5>
          <p>Type : {coachingRequest.type}</p>
          <p>Date de demande : {new Date(coachingRequest.requestDateTime).toLocaleString()}</p>
          <p>Statut : {coachingRequest.status}</p>
        </div>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Informations sur la prestation souhaitée</h5>
          {performanceError ? (
            <Alert variant="danger">Erreur lors de la récupération de la performance : {performanceError}</Alert>
          ) : performance ? (
            <div>
              <p>Titre : {performance.title}</p>
              <p>Description : {performance.description}</p>
            </div>
          ) : (
            <Spinner animation="border" />
          )}
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
    </div>
  );
};

export default AdminRequestCoachingDetail;
