import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchPerformanceById, createPerformance, updatePerformance } from '../../../features/PerformanceSlice';
import { Form, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPerformance = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performance = useSelector((state) => state.performances.performance);
  const loading = useSelector((state) => state.performances.loading);
  const error = useSelector((state) => state.performances.error);

  // États locaux pour les champs du formulaire
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Charger les détails de la performance en mode édition
  useEffect(() => {
    if (mode === 'edit' && id) {
      dispatch(fetchPerformanceById(id));
    }
  }, [dispatch, mode, id]);

  // Mettre à jour les valeurs du formulaire en fonction de la performance récupérée
  useEffect(() => {
    if (mode === 'edit' && performance) {
      setType(performance.type);
      setDescription(performance.description);
      setImage(performance.image);
    }
  }, [performance, mode]);

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerformance = { type, description, image };

    if (mode === 'edit') {
      dispatch(updatePerformance({ id, updatedPerformance: newPerformance }))
        .then(() => {
          toast.success('Performance mise à jour avec succès');
          navigate('/performanceHandler');
        })
        .catch(() => {
          toast.error('Erreur lors de la mise à jour de la performance');
        });
    } else {
      dispatch(createPerformance(newPerformance))
        .then(() => {
          toast.success('Performance ajoutée avec succès');
          navigate('/performanceHandler');
        })
        .catch(() => {
          toast.error('Erreur lors de l\'ajout de la performance');
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
      <h2>{mode === 'edit' ? 'Modifier la performance' : 'Ajouter une performance'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le type de performance"
            value={type}
            onChange={(e) => setType(e.target.value)}
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

        <Button variant="primary" type="submit">
          {mode === 'edit' ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </Form>

      {/* Ajouter le ToastContainer pour afficher les notifications */}
      <ToastContainer />
    </Container>
  );
};

export default AddPerformance;
