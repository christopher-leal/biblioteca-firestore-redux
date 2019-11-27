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
								path="/suscriptor/:id"
								component={Suscriptor}
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
								component={EditarSuscriptor}
							/>
						</Switch>
					</div>
				</Router>
			</ReactReduxFirebaseProvider>
		</Provider>
	);
}

export default App;
