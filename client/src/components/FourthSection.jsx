import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookById } from '../features/BookSlice';
import { Link } from 'react-router-dom';
import styles from './FourthSection.module.css';
import { accountService } from '../services/accountService';

const FourthSection = () => {
    const dispatch = useDispatch();
    const featuredBook = useSelector((state) => state.books.book);
    const loading = useSelector((state) => state.books.loading);
    const error = useSelector((state) => state.books.error);
    const isLoggedIn = accountService.isLogged();

    useEffect(() => {
        dispatch(fetchBookById(4)); // Fetch the book with ID 4
      }, [dispatch]);


      if (loading) {
        return <p>Chargement...</p>;
      }
    
      if (error) {
        return <p>Erreur lors du chargement du livre en vedette : {error}</p>;
      }
  return (
    <div className={styles.featuredSection}>
    <h2 className={styles.sectionTitle}>Livre en Vedette</h2>
    <div className={styles.container}>
      {isLoggedIn ? (
        featuredBook ? (
          <div className={styles.bookCard}>
            <img src={featuredBook.image} className={styles.bookImage} alt={featuredBook.title} />
            <div className={styles.bookDetails}>
              <h5 className={styles.bookTitle}>{featuredBook.title}</h5>
              <p className={styles.bookAuthor}><strong>Auteur :</strong> {featuredBook.author}</p>
              <p className={styles.bookPrice}><strong>Prix :</strong> {featuredBook.price} €</p>
              <p className={styles.bookDescription}>{featuredBook.description}</p>
              <Link to={`/books/${featuredBook.id}`} className={styles.bookButton}>Commander</Link>
            </div>
          </div>
        ) : (
          <p>Aucun livre en vedette disponible.</p>
        )
      ) : (
        <p className={styles.loginMessage}>
          Pour accéder à la boutique de livres, veuillez vous <Link to="/login">connecter</Link>.
        </p>
      )}
    </div>
  </div>
  )
}

export default FourthSection