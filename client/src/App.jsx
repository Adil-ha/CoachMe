import React from 'react';
import { useNavigate, Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accountService } from './services/accountService';
import { logout } from './features/LoginSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// // Import the logo
// import logo from './logo.jpg'; // Update the path accordingly

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = accountService.isLogged();
  const currentUser = accountService.getCurrentUser();

  const handleLogout = () => {
    dispatch(logout());
    accountService.logout();
    navigate('/');
  };

  return (
    <>
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand as={Link} to="/">
              <img
                src={"/logo.png"}
                height="50"
                width="120"
                alt="CoachMe Logo"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isLoggedIn && (
                  <>
                    <Nav.Link as={NavLink} to="/books">eBoutique</Nav.Link>
                    <Nav.Link as={NavLink} to="/requestCoaching">Formulaire de Coaching</Nav.Link>
                    <Nav.Link as={NavLink} to="/cart">Panier</Nav.Link>
                    {currentUser && currentUser.role === 'ROLE_ADMIN' && (
                      <NavDropdown title="Administrateur" id="admin-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/BookHandler">Gestion des livres</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/PerformanceHandler">Gestions des prestations</NavDropdown.Item>
                      </NavDropdown>
                    )}
                  </>
                )}
              </Nav>
              <div className="navbar-text me-3 text-warning">
                {isLoggedIn && currentUser ? `Bienvenue, ${currentUser.name}` : ''}
              </div>
              <Nav>
                {isLoggedIn ? (
                  <Nav.Link as="button" className="btn btn-primary me-2" onClick={handleLogout}>Déconnexion</Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} className="btn btn-warning me-2" to="/login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main className="min-vh-100">
        <Outlet />
      </main>
      <footer className="footer bg-dark text-light text-center py-3">
        © {new Date().getFullYear()} coachMe - Tous droits réservés
      </footer>
    </>
  );
}

export default App;
