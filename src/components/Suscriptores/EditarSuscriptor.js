import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import Spinner from '../layouts/Spinner';
import Swal from 'sweetalert2';

const EditarSuscriptor = ({ id, history }) => {
	// creando los refs
	const nombreRef = useRef('');
	const apellidoRef = useRef('');
	const carreraRef = useRef('');
	const noControlRef = useRef('');
	useFirestoreConnect([
		{ collection: 'suscriptores' } // or 'todos'
	]);
	const firestore = useFirestore();

	const suscriptores = useSelector(
		(state) => state.firestore.ordered.suscriptores
	);
	if (!suscriptores) return <Spinner />;
	const suscriptor = suscriptores.find((suscrip) => suscrip.id === id);
	if (!suscriptor) return <Spinner />;
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			nombreRef.current.value.trim() === '' ||
			apellidoRef.current.value.trim() === '' ||
			carreraRef.current.value.trim() === '' ||
			noControlRef.current.value.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Todos los campos son obligatorios!'
			});
			return;
		}
		const suscriptorActualizado = {
			nombre: nombreRef.current.value,
			apellido: apellidoRef.current.value,
			carrera: carreraRef.current.value,
			noControl: noControlRef.current.value
		};
		await firestore
			.update(
				{ collection: 'suscriptores', doc: suscriptor.id },
				suscriptorActualizado
			)
			.then(() => {
				Swal.fire('Buen trabajo', 'Suscriptor actualizado', 'success');
				history.push('/suscriptores');
			});
	};
	return (
		<div className="row">
			<div className="col-12 mb-4">
				<Link to={'/suscriptores'} className="btn btn-secondary">
					Regresar <i className="la la-arrow-circle-left" />{' '}
				</Link>
			</div>
			<div className="col-12">
				<h2>
					Editar suscriptor <i className="la la-user-edit" />
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="row justify-content-center">
						<div className="col-md-8 mt-5">
							<div className="form-group">
								<label htmlFor="nombre">Nombre:</label>
								<input
									type="text"
									name="nombre"
									className="form-control"
									placeholder="Nombre del suscriptor"
									required
									defaultValue={suscriptor.nombre}
									ref={nombreRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="apellido">Apellido:</label>
								<input
									type="text"
									name="apellido"
									className="form-control"
									placeholder="Apellido del suscriptor"
									required
									defaultValue={suscriptor.apellido}
									ref={apellidoRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="carrera">Carrera:</label>
								<input
									type="text"
									name="carrera"
									className="form-control"
									placeholder="Carrera del suscriptor"
									required
									defaultValue={suscriptor.carrera}
									ref={carreraRef}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="noControl">
									Numero de control:
								</label>
								<input
									type="text"
									name="noControl"
									className="form-control"
									placeholder="Numero de control del suscriptor"
									required
									defaultValue={suscriptor.noControl}
									ref={noControlRef}
								/>
							</div>
							<input
								type="submit"
								value="Agregar"
								className="btn btn-success btn-block"
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default withRouter(EditarSuscriptor);
