import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';

const Suscriptores = () => {
	useFirestoreConnect([
		{ collection: 'suscriptores' } // or 'todos'
	]);
	const suscriptores = useSelector(
		(state) => state.firestore.ordered.suscriptores
	);
	if (!isLoaded(suscriptores)) {
		return <div>Loading...</div>;
	}

	if (isEmpty(suscriptores)) {
		return <div>Todos List Is Empty</div>;
	}
	return <div>hola</div>;
};

export default Suscriptores;
