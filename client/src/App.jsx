import { useNavigate, Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { accountService } from './services/accountService';
import { logout } from './features/LoginSlice';

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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">coachMe</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarColor01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/books">eBoutique</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/requestCoaching">Formulaire de Coaching</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/cart">Panier</NavLink>
                    </li>
                    {currentUser && currentUser.role === 'ROLE_ADMIN' && (
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                      </li>
                    )}
                  </>
                )}
              </ul>
              <div className="navbar-text me-3 text-warning">
                {isLoggedIn && currentUser ? `Bienvenue, ${currentUser.name}` : ''}
              </div>
              <form className="d-flex">
                {isLoggedIn ? (
                  <>
                    <button className="btn btn-primary me-2" onClick={handleLogout}>Déconnexion</button>
                  </>
                ) : (
                  <>
                    <NavLink className="btn btn-warning me-2" to="/login">Login</NavLink>
                  </>
                )}
              </form>
            </div>
          </div>
        </nav>
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
