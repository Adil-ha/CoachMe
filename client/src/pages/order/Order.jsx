import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress } from '../../features/AddressSlice';
import { accountService } from '../../services/accountService';

const Order = () => {
  const dispatch = useDispatch();
  const currentUser = accountService.getCurrentUser();

  const [address, setAddress] = useState({
    number: '',
    street: '',
    town: '',
    code: '',
    country: '',
  });

  const cart = useSelector((state) => state.cart.cart);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAddress = { ...address, user: { id: currentUser.id } };
    dispatch(createAddress(newAddress))
      .unwrap()
      .then(() => {
        console.log('Adresse créée avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la création de l\'adresse :', error);
      });
  };

  const handleOrderValidation = () => {
    // Pour l'instant, nous allons simplement loguer l'action de validation de la commande
    console.log('Commande validée');
  };

  return (
    <div className="container mt-5">
      <h2>Livraison</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Numéro</label>
          <input
            type="text"
            className="form-control"
            id="number"
            name="number"
            value={address.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Rue</label>
          <input
            type="text"
            className="form-control"
            id="street"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="town" className="form-label">Ville</label>
          <input
            type="text"
            className="form-control"
            id="town"
            name="town"
            value={address.town}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">Code postal</label>
          <input
            type="text"
            className="form-control"
            id="code"
            name="code"
            value={address.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Pays</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Valider l'adresse</button>
      </form>
      <h2 className="mt-5">Récapitulatif de la commande</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartDetailDTOList.map((item) => (
            <tr key={item.bookId}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.price} €</td>
              <td>{(item.price * item.quantity).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <p>Montant total de la commande : {cart.totalAmount.toFixed(2)} €</p>
        <button className="btn btn-success" onClick={handleOrderValidation}>
          Valider ma commande
        </button>
      </div>
    </div>
  );
};

export default Order;

