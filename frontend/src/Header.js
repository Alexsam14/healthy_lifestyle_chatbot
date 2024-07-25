import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "./Header.scss";
import axios from 'axios';

function Header({ showLogout = true , onLogout}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post('http://localhost:3001/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('token');
    
    if (onLogout) {
      onLogout();
    }
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <>
      <header className="navbar-menu-light">
        <div className="navbar-menu-light-container">
          <div className="navbar-menu-light-max-width">
            <a href="/" className="navbar-menu-light-link">
              <div className="navbar-menu-light-left-side">
                <img src="/hlc-high-resolution-logo.svg" alt="HLC" className="navbar-menu-light-logo" />
              </div>
            </a>
            <div className="navbar-menu-light-right-side">
              <nav className="navbar-menu-light-super-menu">
                <ul>
                  <li className="super-menu-item">
                    <NavLink to="/about-page" className="navbar-menu-light-label">About Us</NavLink>
                  </li>
                  {showLogout && (  // Only render the Logout button if showLogout is true
                    <li className="super-menu-item">
                      <button onClick={handleLogout} className="navbar-menu-light-label logout-button">Log Out</button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;