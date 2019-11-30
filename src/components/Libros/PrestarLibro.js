import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	useFirestoreConnect,
	useFirestore,
	isEmpty
} from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';
import FichaSuscriptor from '../Suscriptores/FichaSuscriptor';
import { buscarUsuarioAction } from '../../actions/buscarUsuarioAction';

// redux actions
const PrestarLibro = ({ match, history }) => {
	const { id } = match.params;
	const [ busqueda, setBusqueda ] = useState('');
	const firestore = useFirestore();
	const dispatch = useDispatch();

	const suscriptorState = useSelector((state) => state.suscriptor);

	const datosSuscriptor = (suscriptor) =>
		dispatch(buscarUsuarioAction(suscriptor));

	useFirestoreConnect(`libros/${id}`); // sync /posts/postId from firebase into redux
	const libro = useSelector(
		({ firestore: { ordered: { libros } } }) => libros && libros[0]
	);
	if (!libro) return <Spinner />;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const suscriptor = await firestore.get({
			collection: 'suscriptores',
			where: [ 'noControl', '==', busqueda ]
		});
		if (!suscriptor.empty) {
			// console.log(typeof suscriptor.docs[0].data());
			datosSuscriptor(suscriptor.docs[0].data());
		} else {
			datosSuscriptor({});
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text:
					'No se ha encontrado ningun alumno con ese numero de control'
			});
		}
	};
	const solicitarPrestamo = async () => {
		suscriptorState.fechaSolicitud = new Date().toLocaleDateString();
		libro.prestados.push(suscriptorState);
		await firestore
			.update(
				{ collection: 'libros', doc: libro.id },
				{ prestados: libro.prestados }
			)
			.then(() => {
				Swal.fire(
					'Buen trabajo',
					'Prestamo registrado con exito',
					'success'
				);
				history.push('/');
			});
	};

	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/'} className="btn btn-secondary">
					Regresar <i className="la la-arrow-circle-left" />
				</Link>
			</div>
			<div className="col-12">
				<h2>
					Solicitar prestamo: {libro.titulo}{' '}
					<i className="la la-book" />
				</h2>
				<div className="row justify-content-center">
					<div className="col-md-8">
						<form onSubmit={handleSubmit} className="mb-4">
							<legend className="color-primary text-center">
								Busca el suscriptor por codigo
							</legend>
							<div className="form-group">
								<input
									type="text"
									name="busqueda"
									className="form-control"
									onChange={(e) =>
										setBusqueda(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								className="btn btn-success btn-block"
								value="Buscar alumno"
							/>
						</form>
						{/* Mostrar ficha del alumno */}
						{!isEmpty(suscriptorState) && (
							<FichaSuscriptor
								suscriptor={suscriptorState}
								solicitarPrestamo={solicitarPrestamo}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrestarLibro;
