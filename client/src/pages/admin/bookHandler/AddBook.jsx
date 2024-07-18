import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchBookById, createBook, updateBook } from '../../../features/BookSlice';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const book = useSelector((state) => state.books.book);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState(''); 


  useEffect(() => {
    if (mode === 'edit' && id) {
      dispatch(fetchBookById(id));
    }
  }, [dispatch, mode, id]);

  // Mettre à jour les valeurs du formulaire en fonction du livre récupéré
  useEffect(() => {
    if (mode === 'edit' && book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPrice(book.price);
      setImage(book.image);
      setDescription(book.description); 
    }
  }, [book, mode]);

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, price, image, description }; // Ajouter la description

    if (mode === 'edit') {
      dispatch(updateBook({ id, updatedBook: newBook }))
        .then(() => {
          toast.success('Livre mis à jour avec succès');
          navigate('/books');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour du livre');
        });
    } else {
      dispatch(createBook(newBook))
        .then(() => {
          toast.success('Livre ajouté avec succès');
          navigate('/books');
        })
        .catch(() => {
          toast.error('Erreur lors de l\'ajout du livre');
        });
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erreur : {error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2>{mode === 'edit' ? 'Modifier le livre' : 'Ajouter un livre'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Titre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAuthor">
          <Form.Label>Auteur</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez l'auteur"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Prix</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez le prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL de l'image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Entrez la description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {mode === 'edit' ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </Form>

      {/* Ajouter le ToastContainer pour afficher les notifications */}
      <ToastContainer />
    </Container>
  );
};

export default AddBook;
