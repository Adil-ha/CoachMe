import React, { useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/LoginSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      toast.success("Connexion réussie !");
      navigate("/homePage");
    }
    if (error) {
      toast.error("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  }, [user, error, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      toast.warn('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await dispatch(login({ username, password }));
      emailRef.current.value = '';
      passwordRef.current.value = '';
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Connexion</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    ref={emailRef}
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    ref={passwordRef}
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Se connecter
                </button>
              </form>
              <div className="mt-3 text-center">
                <span>Si vous n'avez pas de compte, </span>
                <NavLink to="/register">Inscrivez-vous ici</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
