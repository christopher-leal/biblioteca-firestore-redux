import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
const NuevoLibro = () => {
	const firestore = use();

	const libros = firestore.ordered.libros;

	return <div>nuevo libro</div>;
};

export default NuevoLibro;
