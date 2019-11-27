import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';

const Suscriptor = ({ id }) => {
	useFirestoreConnect([
		{ collection: 'suscriptores' } // or 'todos'
	]);
	const suscriptores = useSelector(
		(state) => state.firestore.ordered.suscriptores
	);
	if (!suscriptores) return <Spinner />;
	const suscriptor = suscriptores.find((suscriptor) => suscriptor.id === id);
	console.log(suscriptor);

	return (
		<div className="row">
			<div className="col-md-6 mb-4">
				<Link to={'/suscriptores'} className="btn btn-secondary">
					Regresar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-md-6">
				<Link
					to={`/suscriptores/editar/${suscriptor.id}`}
					className="btn btn-primary float-right"
				>
					Editar suscriptor <i className="la la-user-edit" />
				</Link>
			</div>
			<hr className="mx-5 w-100" />
			<div className="col-12">
				<h2 className="mb-4">
					{suscriptor.nombre} {suscriptor.apellido}
				</h2>
				<p>
					<span className="font-weight-bold">Carrera: </span>
					{suscriptor.carrera}
				</p>
				<p>
					<span className="font-weight-bold">
						Numero de control:{' '}
					</span>
					{suscriptor.noControl}
				</p>
			</div>
		</div>
	);
};

export default Suscriptor;
