import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "./Header.scss";

function Header({ showLogout = true }) {  // Add this prop with a default value
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
                      <NavLink to="/" className="navbar-menu-light-label">Log Out</NavLink>
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