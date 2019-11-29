import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const Libro = ({ match, history }) => {
	const { id } = match.params;
	const firestore = useFirestore();
	useFirestoreConnect(`libros/${id}`); // sync /posts/postId from firebase into redux
	const libro = useSelector(
		({ firestore: { ordered: { libros } } }) => libros && libros[0]
	);
	if (!libro) return <Spinner />;
	let btnPrestamo = libro.existencia - libro.prestados.length > 0 && (
		<Link
			to={`/libros/prestamo/${libro.id}`}
			className="btn btn-success my-3"
		>
			Solicitar prestamo
		</Link>
	);

	const devolverLibro = async (id) => {
		const prestados = libro.prestados.filter(
			(prestamo) => prestamo.noControl !== id
		);

		await firestore
			.update(
				{ collection: 'libros', doc: libro.id },
				{ prestados: prestados }
			)
			.then(() => {
				Swal.fire(
					'Buen trabajo',
					'Prestamo devuelto con exito',
					'success'
				);
				history.push('/');
			});
	};

	return (
		<div className="row">
			<div className="col-md-6 mb-4">
				<Link to={`/`} className="btn btn-secondary">
					Regresar <i className="la la-arrow-circle-left" />
				</Link>
			</div>
			<div className="col-md-6 mb-4">
				<Link
					to={`/libros/editar/${libro.id}`}
					className="btn btn-primary"
				>
					Editar libro <i className="la la-edit" />
				</Link>
			</div>
			<hr className="mx-5 w-100" />
			<div className="col-12">
				<h2 className="mb-4">{libro.titulo}</h2>
				<p>
					<span className="font-weight-bold">ISNB: </span>
					{libro.isbn}
				</p>
				<p>
					<span className="font-weight-bold">Editorial: </span>
					{libro.editorial}
				</p>
				<p>
					<span className="font-weight-bold">Existencia: </span>
					{libro.existencia}
				</p>
				<p>
					<span className="font-weight-bold">Disponibles: </span>
					{libro.existencia - libro.prestados.length}
				</p>
				{btnPrestamo}

				{/* Muestra las personas que tienen los libros */}
				{libro.prestados.length > 0 && (
					<h3 className="my-2">
						Personas que tienen el libro prestado
					</h3>
				)}
				{libro.prestados.map((prestamo) => (
					<div key={prestamo.noControl} className="card my-2">
						<h4 className="card-header">
							{prestamo.nombre} {prestamo.apellido}
						</h4>
						<div className="card-body">
							<p>
								<span className="font-weight-bold">
									No.Control:{' '}
								</span>
								{prestamo.noControl}
							</p>
							<p>
								<span className="font-weight-bold">
									Carrera:{' '}
								</span>
								{prestamo.carrera}
							</p>
							<p>
								<span className="font-weight-bold">
									Fecha solicitud:{' '}
								</span>
								{prestamo.fechaSolicitud}
							</p>
						</div>
						<div className="card-footer">
							<button
								className="btn btn-success font-weight-bold"
								onClick={() =>
									devolverLibro(prestamo.noControl)}
							>
								Devolver libro
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Libro;
