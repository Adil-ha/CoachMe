import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPerformances } from '../features/PerformanceSlice';
import { createCoachingRequest } from '../features/RequestCoachingSlice';
import styles from './RequestCoaching.module.css';
import { accountService } from '../services/accountService';
import { Link } from 'react-router-dom'; // Importez Link pour naviguer vers "/"

const RequestCoaching = () => {
  const dispatch = useDispatch();
  const performances = useSelector((state) => state.performances.performances);
  const currentUser = accountService.getCurrentUser();

  const [isRequestSent, setIsRequestSent] = useState(false); // State pour gérer l'affichage du message de réussite

  useEffect(() => {
    dispatch(fetchAllPerformances());
  }, [dispatch]);

  const typeRef = useRef();
  const performanceRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coachingRequest = {
      type: typeRef.current.value,
      userId: currentUser.id,
      performanceId: performanceRef.current.value,
    };
    
    try {
      await dispatch(createCoachingRequest(coachingRequest));
      setIsRequestSent(true); // Mettre à jour le state pour afficher le message de réussite
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande :', error);
      // Gérer les erreurs si nécessaire
    }
  };

  if (!performances.length || !currentUser) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.requestCoaching}>
      <h2>Bonjour {currentUser.name}, bienvenue sur notre plateforme de coaching !</h2>
      {isRequestSent ? (
        <div className={styles.successMessage}>
          <p>Votre demande de coaching a été soumise avec succès !</p>
          <Link to="/" className={styles.homeLink}>
            <button className={styles.returnButton}>Retour à l'accueil</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.coachingForm}>
          <div className={styles.formGroup}>
            <label htmlFor="type">Type de séance</label>
            <select id="type" ref={typeRef} className={styles.formControl}>
              <option value="HOME">À domicile</option>
              <option value="OUTDOOR">En extérieur</option>
              <option value="VIDEOCONFERENCE">Par vidéoconférence</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="performance">Prestation</label>
            <select id="performance" ref={performanceRef} className={styles.formControl}>
              {performances.map((performance) => (
                <option key={performance.id} value={performance.id}>
                  {performance.type}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>Envoyer la demande</button>
        </form>
      )}
    </div>
  );
};

export default RequestCoaching;


