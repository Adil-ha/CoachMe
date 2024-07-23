import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../../features/BookSlice';
import { createAddress } from '../../features/AddressSlice';
import { createOrder, addBookToOrder } from '../../features/OrderSlice';
import { accountService } from '../../services/accountService';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = accountService.getCurrentUser();
  const cart = useSelector((state) => state.cart.cart);

  const [address, setAddress] = useState({
    number: '',
    street: '',
    town: '',
    code: '',
    country: 'France', 
  });

  const [booksMap, setBooksMap] = useState({});

  useEffect(() => {
    if (cart && cart.cartDetailDTOList) {
      const initialBooksMap = {};
      const promises = cart.cartDetailDTOList.map((item) => {
        return dispatch(fetchBookById(item.bookId))
          .then((action) => {
            initialBooksMap[item.bookId] = action.payload;
          })
          .catch((error) => {
            console.error(`Erreur lors de la récupération des détails du livre pour l'ID ${item.bookId}:`, error);
          });
      });

      Promise.all(promises)
        .then(() => {
          setBooksMap(initialBooksMap);
        });
    }
  }, [cart, dispatch]);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderValidation = (e) => {
    e.preventDefault();
    const newAddress = { ...address, userId: currentUser.id };
    console.log(newAddress);
    dispatch(createAddress(newAddress))
        .unwrap()
        .then((createdAddress) => {
            console.log('Adresse créée avec succès', createdAddress);
            if (cart && cart.cartDetailDTOList) {
                dispatch(createOrder({ userId: currentUser.id }))
                    .unwrap()
                    .then((createdOrder) => {
                        console.log('Commande créée avec succès', createdOrder);

                        const orderDetailDTOList = cart.cartDetailDTOList.map((item) => ({
                            bookId: item.bookId,
                            quantity: item.quantity
                        }));
                        console.log('Order ID:', createdOrder.id);
                        console.log('Order Detail List:', orderDetailDTOList);
                        dispatch(addBookToOrder({ orderId: createdOrder.id, orderDetailDTOList }))
                            .unwrap()
                            .then(() => {
                                console.log('Tous les livres ont été ajoutés à la commande');
                                navigate(`${createOrder}`); 
                            })
                            .catch((error) => {
                                console.error('Erreur lors de l\'ajout des livres à la commande :', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la création de la commande :', error);
                    });
            } else {
                console.error('Impossible de créer la commande : le panier est vide ou non défini');
            }
        })
        .catch((error) => {
            console.error('Erreur lors de la création de l\'adresse :', error);
        });
};

  const handleCancelOrder = () => {
    navigate('/');
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2>Récapitulatif de la commande</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartDetailDTOList.map((item) => (
                <tr key={item.bookId}>
                  <td>
                    <img 
                      src={booksMap[item.bookId]?.image || 'placeholder.jpg'} 
                      alt={booksMap[item.bookId]?.title || 'Image indisponible'} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{booksMap[item.bookId]?.title || 'Titre inconnu'}</td>
                  <td>{item.quantity}</td>
                  <td>{booksMap[item.bookId]?.price || 0} €</td>
                  <td>{(booksMap[item.bookId]?.price * item.quantity).toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="h3">Montant total de la commande : {cart.totalAmount.toFixed(2)} €</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-8">
          <h2>Livraison</h2>
          <form onSubmit={handleOrderValidation}>
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
                readOnly // Make the country field read-only
              />
            </div>
            <div className="text-end my-3">
              <button className="btn btn-danger me-3" onClick={handleCancelOrder}>
                Annuler ma commande
              </button>
              <button type="submit" className="btn btn-success">
                Valider ma commande
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
