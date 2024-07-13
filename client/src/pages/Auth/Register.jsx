import React, { useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from '../../features/LoginSlice';
import { useNavigate } from "react-router-dom";
import { Alert } from 'bootstrap';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const phoneRef = useRef(null);  // Ref pour le champ téléphone

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const phone = phoneRef.current.value;  // Récupération de la valeur du champ téléphone

        if (!name || !email || !password || !phone) {  // Vérification du champ téléphone
            alert("Tous les champs sont obligatoires !");
            return;
        }

        dispatch(register({ name, email, password, phone }))  // Envoi de phone au backend

        navigate("/login");
    };

    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="card-title text-center">Inscription</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nom d'utilisateur</label>
                                    <input type="text" className="form-control" id="name" ref={usernameRef} placeholder="Enter username" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" ref={emailRef} placeholder="Enter email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                    <input type="password" className="form-control" id="password" ref={passwordRef} placeholder="Password" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Numéro de téléphone</label>
                                    <input type="text" className="form-control" id="phone" ref={phoneRef} placeholder="Enter phone number" />
                                </div>
                                <button type="submit" className="btn btn-success">S'inscrire</button>
                            </form>
                            <div className="mt-3 text-center">
                                <span>Si vous avez déjà un compte, </span>
                                <NavLink to="/login">connectez-vous ici</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
