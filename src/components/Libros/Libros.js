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

const Libros = () => {
	useFirestoreConnect([
		{ collection: 'libros' } // or 'todos'
	]);
	const libros = useSelector((state) => state.firestore.ordered.libros);

	const firestore = useFirestore();
	if (!isLoaded(libros) || !libros) return <Spinner />;

	if (isEmpty(libros)) {
		return <h1 className="text-center">No hay libros para mostrar</h1>;
	}
	const eliminarSuscriptor = (id) => {
		Swal.fire({
			title: 'Estas seguro?',
			text: 'Una vez eliminado el libro no se podra recuperar!',
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
						collection: 'libros',
						doc: id
					})
					.then(() => {
						Swal.fire('Buen trabajo', 'Libro eliminado', 'success');
					});
			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-12 mb-4">
				<Link to={'/libros/nuevo'} className="btn btn-primary">
					<i className="la la-plus" /> Nuevo Libro
				</Link>
			</div>
			<div className="col-md-8">
				<h2>
					<i className="las la-users" />Libros
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
					{libros.map((libro) => (
						<tr key={libro.id}>
							<td>
								{libro.nombre} {libro.apellido}
							</td>
							<td>{libro.carrera}</td>
							<td>
								<Link
									to={`/libro/${libro.id}`}
									className="btn btn-success btn-block"
								>
									Mas informacion{' '}
									<i className="la la-info-circle" />
								</Link>
								<button
									className="btn btn-danger btn-block"
									onClick={() => eliminarSuscriptor(libro.id)}
								>
									Eliminar libro{' '}
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

export default Libros;
