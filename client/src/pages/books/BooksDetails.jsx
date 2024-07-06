import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../../features/BookSlice';
import { createCart, addBookToCart, fetchCartByUserId } from '../../features/CartSlice';
import { accountService } from '../../services/accountService';

const BooksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book);
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const [quantity, setQuantity] = useState(1);
  const userId = accountService.getCurrentUser()?.id || 1;

  useEffect(() => {
    dispatch(fetchBookById(id));
    dispatch(fetchCartByUserId(userId));
  }, [dispatch, id, userId]);

  const handleAddToCart = () => {
    const cartId = cart ? cart.id : null;
    const bookId = id;
    const cartDetailDTO = { bookId, quantity };

    if (cartId) {
      dispatch(addBookToCart({ cartId, ...cartDetailDTO }))
        .unwrap()
        .then(() => {
          console.log('Book added to cart');
          navigate('/cart'); // Redirection vers la page du panier
        })
        .catch((error) => {
          console.error('Error adding book to cart:', error);
        });
    } else {
      dispatch(createCart({ userId }))
        .unwrap()
        .then((newCart) => {
          console.log('Cart created:', newCart);
          dispatch(addBookToCart({ cartId: newCart.id, ...cartDetailDTO }))
            .unwrap()
            .then(() => {
              console.log('Book added to new cart');
              navigate('/cart'); // Redirection vers la page du panier
            })
            .catch((error) => {
              console.error('Error adding book to new cart:', error);
            });
        })
        .catch((error) => {
          console.error('Error creating cart:', error);
        });
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(5, e.target.value));
    setQuantity(value);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement du livre : {error}</p>;
  }

  if (!book) {
    return <p>Pas de données disponibles pour ce livre.</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {book.image ? (
            <img src={`/${book.image}`} className="img-fluid" alt={book.title} />
          ) : (
            <p>Image non disponible</p>
          )}
        </div>
        <div className="col-md-6">
          <h2>{book.title}</h2>
          <p><strong>Auteur :</strong> {book.author}</p>
          <p><strong>Prix :</strong> {book.price} €</p>
          <p>{book.description}</p>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantité :</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="5"
            />
          </div>
          <button className="btn btn-danger me-2" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;







