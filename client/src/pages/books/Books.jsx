import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../../features/BookSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Books.module.css';

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur lors du chargement des livres : {error}</p>;
  }

  const handleViewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {books.map((book) => (
          <div className="col-md-6 mb-4" key={book.id}>
            <div className="card h-100">
            <img src={book.image} className={`card-img-top ${styles['book-image']}`} alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Auteur :</strong> {book.author}</p>
                <p className="card-text h3"><strong>Prix :</strong> {book.price} €</p>
                <p className="card-text">{book.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(book.id)}
                >
                  Commander
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;

