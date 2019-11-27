import React from 'react';
import { useSelector } from 'react-redux';
import {
	useFirestoreConnect,
	isLoaded,
	isEmpty,
	useFirestore
} from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Spinner from '../layouts/Spinner';

const Suscriptores = () => {
	useFirestoreConnect([
		{ collection: 'suscriptores' } // or 'todos'
	]);
	const suscriptores = useSelector(
		(state) => state.firestore.ordered.suscriptores
	);
	const firestore = useFirestore();
	if (!isLoaded(suscriptores)) {
		return <Spinner />;
	}

	if (isEmpty(suscriptores)) {
		return <div>Todos List Is Empty</div>;
	}
	const eliminarSuscriptor = (id) => {
		Swal.fire({
			title: 'Estas seguro?',
			text: 'Una vez eliminado el suscriptor no se podra recuperar!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar!',
			cancelButtonText: 'Cancelar'
		}).then(async (result) => {
			if (result.value) {
				await firestore
					.delete({
						collection: 'suscriptores',
						doc: id
					})
					.then(() => {
						Swal.fire(
							'Buen trabajo',
							'Suscriptor eliminado',
							'success'
						);
					});
			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link to={'/suscriptores/nuevo'} className="btn btn-primary">
					<i className="la la-plus" /> Nuevo suscriptor
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					<i className="las la-users" />Suscriptores
				</h2>
			</div>
			<table className="table table-striped mt-4">
				<thead className="text-light bg-primary">
					<tr>
						<th>Nombre</th>
						<th>Carrera</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{suscriptores.map((suscriptor) => (
						<tr key={suscriptor.id}>
							<td>
								{suscriptor.nombre} {suscriptor.apellido}
							</td>
							<td>{suscriptor.carrera}</td>
							<td>
								<Link
									to={`/suscriptor/${suscriptor.id}`}
									className="btn btn-success btn-block"
								>
									Mas informacion{' '}
									<i className="la la-info-circle" />
								</Link>
								<button
									className="btn btn-danger btn-block"
									onClick={() =>
										eliminarSuscriptor(suscriptor.id)}
								>
									Eliminar suscriptor{' '}
									<i className="la la-trash-alt" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Suscriptores;
