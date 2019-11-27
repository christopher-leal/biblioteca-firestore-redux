import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
			<nav className="navbar navbar-dark">
				<span className="navbar-brand mb-0 h1">
					Administrador de Biblioteca
				</span>
			</nav>

			<ul className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link className="nav-link" to={'/suscriptores'}>
						Suscriptores
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to={'/libros'}>
						Libros
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
