import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookItem.module.css';

const BookItem = ({ book }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/booksDetail/${book.id}`);
  };

  return (
    <div className="col-md-6 mb-4">
      <div className={`card h-100 ${styles.bookCard}`}>
        <img src={book.image} className={`card-img-top ${styles.bookImage}`} alt={book.title} />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text"><strong>Auteur :</strong> {book.author}</p>
          <p className="card-text h3"><strong>Prix :</strong> {book.price} €</p>
          <p className="card-text">{book.description}</p>
          <button className="btn btn-primary" onClick={handleViewDetails}>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
