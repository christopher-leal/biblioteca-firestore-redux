import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, rrfProps } from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import Suscriptores from './components/Suscriptores/Suscriptores';
import Suscriptor from './components/Suscriptores/Suscriptor';
import NuevoSuscriptor from './components/Suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './components/Suscriptores/EditarSuscriptor';
import Navbar from './components/layouts/Navbar';
import Libros from './components/Libros/Libros';
import Libro from './components/Libros/Libro';
import EditarLibro from './components/Libros/EditarLibro';
import NuevoLibro from './components/Libros/NuevoLibro';
import PrestarLibro from './components/Libros/PrestarLibro';
import Login from './components/Auth/Login';
import {
	UserIsAuthenticated,
	UserIsNotAuthenticated
} from './components/helpers/auth';

function App() {
	return (
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							<Route
								exact
								path="/login"
								component={UserIsNotAuthenticated(Login)}
							/>
							{/* libros */}
							<Route
								exact
								path="/"
								component={UserIsAuthenticated(Libros)}
							/>
							<Route
								exact
								path="/libro/:id"
								component={UserIsAuthenticated(Libro)}
							/>
							<Route
								exact
								path="/libros/nuevo"
								component={UserIsAuthenticated(NuevoLibro)}
							/>
							<Route
								exact
								path="/libros/editar/:id"
								component={UserIsAuthenticated(EditarLibro)}
							/>
							<Route
								exact
								path="/libros/prestamo/:id"
								component={UserIsAuthenticated(PrestarLibro)}
							/>
							{/* Suscriptores */}
							<Route
								exact
								path="/suscriptor/:id"
								component={UserIsAuthenticated(Suscriptor)}
							/>
							<Route
								exact
								path="/suscriptores"
								component={UserIsAuthenticated(Suscriptores)}
							/>
							<Route
								exact
								path="/suscriptores/nuevo"
								component={UserIsAuthenticated(NuevoSuscriptor)}
							/>
							<Route
								exact
								path="/suscriptores/editar/:id"
								component={UserIsAuthenticated(
									EditarSuscriptor
								)}
							/>
							<Route
								render={() => (
									<h1 className="text-center">
										Pagina no encontrada
									</h1>
								)}
							/>
						</Switch>
					</div>
				</Router>
			</ReactReduxFirebaseProvider>
		</Provider>
	);
}

export default App;
