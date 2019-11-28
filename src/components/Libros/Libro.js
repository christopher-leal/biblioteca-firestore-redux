import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';

const Libro = ({ match }) => {
	const { id } = match.params;
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
			</div>
		</div>
	);
};

export default Libro;
