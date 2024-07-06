import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPerformances } from '../features/PerformanceSlice';
import { createCoachingRequest } from '../features/RequestCoachingSlice';
import { createAddress } from '../features/AddressSlice'; // Importer l'action pour créer une adresse
import styles from './RequestCoaching.module.css';
import { accountService } from '../services/accountService';
import { Link } from 'react-router-dom';

const RequestCoaching = () => {
  const dispatch = useDispatch();
  const performances = useSelector((state) => state.performances.performances);
  const currentUser = accountService.getCurrentUser();

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [addressData, setAddressData] = useState({
    number: '',
    street: '',
    town: '',
    code: '',
    country: 'France', // Défaut à 'France'
    userId: currentUser.id,
  });
  const [formValues, setFormValues] = useState({
    type: 'HOME', // Valeur par défaut pour le type de séance
    performanceId: 1, // Performance sélectionnée
  });

  useEffect(() => {
    dispatch(fetchAllPerformances());
  }, [dispatch]);

  const typeRef = useRef();
  const performanceRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (!addressData.number || !addressData.street || !addressData.town || !addressData.code) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const createdAddress = await dispatch(createAddress(addressData));
      const coachingRequest = {
        type: formValues.type,
        userId: currentUser.id,
        performanceId: formValues.performanceId,
        addressId: createdAddress.payload.id,
      };

      await dispatch(createCoachingRequest(coachingRequest));
      setIsRequestSent(true);
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande :', error);
      // Gérer les erreurs si nécessaire
    }
  };

  // Handler pour le changement de sélection de la prestation
  const handlePerformanceChange = (e) => {
    setFormValues({ ...formValues, performanceId: e.target.value });
  };

  // Handler pour le changement de sélection du type de séance
  const handleTypeChange = (e) => {
    setFormValues({ ...formValues, type: e.target.value });
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
            <select id="type" value={formValues.type} onChange={handleTypeChange} className={styles.formControl}>
              <option value="HOME">À domicile</option>
              <option value="OUTDOOR">En extérieur</option>
              <option value="VIDEOCONFERENCE">Par vidéoconférence</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="performance">Prestation</label>
            <select id="performance" value={formValues.performanceId} onChange={handlePerformanceChange} className={styles.formControl}>
              {performances.map((performance) => (
                <option key={performance.id} value={performance.id}>
                  {performance.type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Pays</label>
            <div className={styles.staticControl}>{addressData.country}</div>
            {/* Input caché pour maintenir la valeur dans le state */}
            <input type="hidden" value={addressData.country} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="number">Numéro</label>
            <input type="number" id="number" value={addressData.number} onChange={(e) => setAddressData({ ...addressData, number: e.target.value })} className={styles.formControl} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="street">Rue</label>
            <input type="text" id="street" value={addressData.street} onChange={(e) => setAddressData({ ...addressData, street: e.target.value })} className={styles.formControl} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="town">Ville</label>
            <input type="text" id="town" value={addressData.town} onChange={(e) => setAddressData({ ...addressData, town: e.target.value })} className={styles.formControl} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="code">Code postal</label>
            <input type="number" id="code" value={addressData.code} onChange={(e) => setAddressData({ ...addressData, code: e.target.value })} className={styles.formControl} />
          </div>
          <button type="submit" className={styles.submitButton}>Envoyer la demande</button>
        </form>
      )}
    </div>
  );
};

export default RequestCoaching;





