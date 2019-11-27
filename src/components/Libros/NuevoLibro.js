import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const NuevoLibro = ({ history }) => {
	const firestore = useFirestore();
	const [ titulo, setTitulo ] = useState('');
	const [ editorial, setEditorial ] = useState('');
	const [ isbn, setIsbn ] = useState('');
	const [ existencia, setExistencia ] = useState('');
	const prestados = [];
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			titulo.trim() === '' ||
			editorial.trim() === '' ||
			isbn.trim() === '' ||
			existencia.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Todos los campos son obligatorios!'
			});
			return;
		}
		await firestore
			.add(
				{ collection: 'libros' },
				{ titulo, editorial, isbn, existencia, prestados }
			)
			.then(() => {
				Swal.fire(
					'Buen trabajo',
					'Libro agregado correctamente',
					'success'
				);
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
									value={titulo}
									onChange={(e) => setTitulo(e.target.value)}
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
									value={editorial}
									onChange={(e) =>
										setEditorial(e.target.value)}
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
									value={isbn}
									onChange={(e) => setIsbn(e.target.value)}
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
									value={existencia}
									onChange={(e) =>
										setExistencia(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Agregar libro"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NuevoLibro;
