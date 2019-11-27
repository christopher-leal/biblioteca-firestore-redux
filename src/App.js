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

function App() {
	return (
		<Provider store={store}>
			<ReactReduxFirebaseProvider {...rrfProps}>
				<Router>
					<Navbar />
					<div className="container">
						<Switch>
							{/* libros */}
							<Route exact path="/" component={Libros} />
							<Route exact path="/libro/:id" component={Libro} />
							<Route
								exact
								path="/libros/nuevo"
								component={NuevoLibro}
							/>
							<Route
								exact
								path="/libros/editar/:id"
								component={EditarLibro}
							/>
							<Route
								exact
								path="/libros/prestamo/:id"
								component={PrestarLibro}
							/>
							{/* Suscriptores */}
							<Route
								exact
								path="/suscriptor/:id"
								render={({ match }) => {
									const { id } = match.params;
									return <Suscriptor id={id} />;
								}}
							/>
							<Route
								exact
								path="/suscriptores"
								component={Suscriptores}
							/>
							<Route
								exact
								path="/suscriptores/nuevo"
								component={NuevoSuscriptor}
							/>
							<Route
								exact
								path="/suscriptores/editar/:id"
								render={({ match }) => {
									const { id } = match.params;
									return <EditarSuscriptor id={id} />;
								}}
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
