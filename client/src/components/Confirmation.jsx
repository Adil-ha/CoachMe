import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h2 className="card-title">Félicitations !</h2>
          <p className="card-text">
            Votre commande a été passée avec succès. Votre numéro de commande est <strong>{id}</strong>.
          </p>
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
