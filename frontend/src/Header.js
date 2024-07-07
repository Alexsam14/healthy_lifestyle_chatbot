import { Outlet, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"
import "./Header.scss";

function Header() {
	return (
		<div>
			<nav>
				<p className="logo" ml-3>HLC</p>
				<ul>
					<li className="btn  btn-lg">
						<NavLink to="/sign-in">Sign-In</NavLink>
					</li>
					<li className="btn  btn-lg">
						<NavLink to="/about-page">About Us</NavLink>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
}

export default Header;
