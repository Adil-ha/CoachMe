import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { fetchAllBooks, deleteBook } from '../../../features/BookSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  console.log(books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id))
      .then(() => {
        toast.success('Livre supprimé avec succès');
      })
      .catch(() => {
        toast.error('Erreur lors de la suppression du livre');
      });
  };

  const handleUpdate = (id) => {
    navigate(`/AddBook?mode=edit&id=${id}`);
  };

  const handleAddBook = () => {
    navigate('/AddBook?mode=add');
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erreur : {error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2>Gestion des Livres</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Auteur</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>
                <img
                  src={`/${book.image}`}
                  alt={book.title}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price} €</td>
              <td>
                <Button className="me-2" variant="warning" onClick={() => handleUpdate(book.id)}>
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(book.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAddBook}>
        Ajouter un livre
      </Button>

      {/* Ajouter le ToastContainer pour afficher les notifications */}
      <ToastContainer />
    </Container>
  );
};

export default BookHandler;
