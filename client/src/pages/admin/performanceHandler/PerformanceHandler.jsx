import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { fetchAllPerformances, deletePerformance } from '../../../features/PerformanceSlice';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PerformanceHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { performances, loading, error } = useSelector((state) => state.performances);

  useEffect(() => {
    dispatch(fetchAllPerformances());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePerformance(id));
  };

  const handleUpdate = (id) => {
    navigate(`/AddPerformance?mode=edit&id=${id}`);
  };

  const handleAddPerformance = () => {
    navigate(`/AddPerformance?mode=add`);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Erreur : {error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h2>Gestion des Performances</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Type</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {performances.map((performance) => (
            <tr key={performance.id}>
              <td>
                <img
                  src={`/${performance.image}`}
                  alt={performance.type}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>{performance.type}</td>
              <td>{performance.description}</td>
              <td className="d-flex">
                <Button className="me-2" variant="warning" onClick={() => handleUpdate(performance.id)}>
                    <FaEdit />
                </Button>
                <Button variant="danger" onClick={() => handleDelete(performance.id)} className="ml-2">
                    <FaTrash />
                </Button>
            </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleAddPerformance}>
        Ajouter une performance
      </Button>
    </Container>
  );
};

export default PerformanceHandler;
