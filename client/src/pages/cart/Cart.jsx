import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCartByUserId, removeBookFromCart, clearCart } from '../../features/CartSlice';
import { accountService } from '../../services/accountService';
import { fetchBookById } from '../../features/BookSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const [quantityMap, setQuantityMap] = useState({});
  const [booksMap, setBooksMap] = useState({});

  useEffect(() => {
    const userId = accountService.getCurrentUser()?.id || 1;
    dispatch(fetchCartByUserId(userId));
  }, [dispatch]);

  useEffect(() => {
    if (cart && cart.cartDetailDTOList) {
      const initialQuantityMap = {};
      const initialBooksMap = {};

      const promises = cart.cartDetailDTOList.map((item) => {
        initialQuantityMap[item.bookId] = item.quantity;
        return dispatch(fetchBookById(item.bookId))
          .then((action) => {
            initialBooksMap[item.bookId] = action.payload; // Utilisation de `action.payload` pour obtenir les détails du livre
          })
          .catch((error) => {
            console.error(`Erreur lors de la récupération des détails du livre pour l'ID ${item.bookId}:`, error);
          });
      });

      Promise.all(promises)
        .then(() => {
          setBooksMap(initialBooksMap);
          setQuantityMap(initialQuantityMap);
        });
    }
  }, [cart, dispatch]);

  const handleQuantityChange = (bookId, e) => {
    const value = parseInt(e.target.value, 10);
    setQuantityMap((prevMap) => ({
      ...prevMap,
      [bookId]: value,
    }));
  };

  const handleRemoveFromCart = (bookId) => {
    dispatch(removeBookFromCart({ cartId: cart.id, bookId }))
      .unwrap()
      .then(() => {
        console.log('Livre supprimé du panier');
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression du livre du panier :', error);
      });
  };

  const handleClearCart = () => {
    dispatch(clearCart(cart.id))
      .unwrap()
      .then(() => {
        console.log('Panier vidé');
        navigate('/');
      })
      .catch((error) => {
        console.error('Erreur lors du vidage du panier :', error);
      });
  };

  if (loading) {
    return <p>Chargement du panier...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement du panier : {error}</p>;
  }

  if (!cart || !cart.cartDetailDTOList || cart.cartDetailDTOList.length === 0) {
    return <p>Le panier est vide.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Détails du panier</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartDetailDTOList.map((item) => (
            <tr key={item.bookId}>
              <td>
                {booksMap[item.bookId]?.image ? (
                  <img
                    src={booksMap[item.bookId].image}
                    alt={booksMap[item.bookId]?.title || 'Image du livre'}
                    style={{ width: '100px', height: 'auto' }}
                  />
                ) : (
                  'Image non disponible'
                )}
              </td>
              <td>{booksMap[item.bookId]?.title || 'Titre inconnu'}</td>
              <td>
                <input
                  type="number"
                  value={quantityMap[item.bookId] || 1}
                  onChange={(e) => handleQuantityChange(item.bookId, e)}
                  min="1"
                  max="5"
                />
              </td>
              <td>{booksMap[item.bookId]?.price || 0} €</td>
              <td>
                <button className="btn btn-danger btn-sm me-2" onClick={() => handleRemoveFromCart(item.bookId)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <p>Montant total du panier : {cart.totalAmount.toFixed(2)} €</p>
        <button className="btn btn-warning" onClick={handleClearCart}>
          Vider le panier
        </button>
        <button className="btn btn-primary ms-2" onClick={() => navigate('/books')}>
          Continuer mes achats
        </button>
        <button className="btn btn-success ms-2" onClick={() => navigate('/order')}>
          Paiement
        </button>
      </div>
    </div>
  );
};

export default Cart;
