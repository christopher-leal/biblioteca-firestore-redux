import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const EditarLibro = ({ match, history }) => {
	const { id } = match.params;
	const firestore = useFirestore();
	const tituloRef = useRef('');
	const isbnRef = useRef('');
	const existenciaRef = useRef('');
	const editorialRef = useRef('');

	useFirestoreConnect(`libros/${id}`); // sync /posts/postId from firebase into redux
	const libro = useSelector(
		({ firestore: { ordered: { libros } } }) => libros && libros[0]
	);
	if (!libro) return <Spinner />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			tituloRef.current.value.trim() === '' ||
			editorialRef.current.value.trim() === '' ||
			isbnRef.current.value.trim() === '' ||
			existenciaRef.current.value.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Todos los campos son obligatorios!'
			});
			return;
		}
		const libroActualizado = {
			titulo: tituloRef.current.value,
			editorial: editorialRef.current.value,
			isnb: isbnRef.current.value,
			existencia: existenciaRef.current.value
		};
		await firestore
			.update({ collection: 'libros', doc: libro.id }, libroActualizado)
			.then(() => {
				Swal.fire('Buen trabajo', 'Libro actualizado', 'success');
				history.push('/');
			});
	};

	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/'} className="btn btn-secondary">
					Regresar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-12">
				<h2>
					Nuevo libro <i className="la la-book" />
				</h2>
				<div className="justify-content-center row">
					<div className="col-md-8 mt-5">
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="titulo">Titulo:</label>
								<input
									type="text"
									name="titulo"
									className="form-control"
									placeholder="Titulo o nombre del libro"
									required
									defaultValue={libro.titulo}
									ref={tituloRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="editorial">Editorial:</label>
								<input
									type="text"
									name="editorial"
									className="form-control"
									placeholder="Editorial del libro"
									required
									defaultValue={libro.editorial}
									ref={editorialRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="isbn">ISBN:</label>
								<input
									type="text"
									name="isbn"
									className="form-control"
									placeholder="ISBN del libro"
									required
									defaultValue={libro.isbn}
									ref={isbnRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="existencia">Existencia:</label>
								<input
									type="number"
									min="0"
									name="existencia"
									className="form-control"
									placeholder="Cantidad de libros en existencia"
									required
									defaultValue={libro.existencia}
									ref={existenciaRef}
								/>
							</div>
							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Editar libro"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditarLibro;
