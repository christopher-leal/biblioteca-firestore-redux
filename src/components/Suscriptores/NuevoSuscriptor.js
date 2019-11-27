import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const NuevoSuscriptor = ({ history }) => {
	const [ nombre, setNombre ] = useState('');
	const [ apellido, setApellido ] = useState('');
	const [ carrera, setCarrera ] = useState('');
	const [ noControl, setNoControl ] = useState('');
	const [ error, setError ] = useState(false);
	const firestore = useFirestore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			nombre.trim() === '' ||
			apellido.trim() === '' ||
			carrera.trim() === '' ||
			noControl.trim() === ''
		) {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Todos los campos son obligatorios!'
			});
			setError(true);
			return;
		}
		if (!error) {
			await firestore
				.add(
					{ collection: 'suscriptores' },
					{
						nombre,
						apellido,
						carrera,
						noControl
					}
				)
				.then(() => {
					Swal.fire(
						'Buen trabajo',
						'Suscriptor agregado correctamente',
						'success'
					);
					setNombre('');
					setApellido('');
					setCarrera('');
					setNoControl('');
					setError(false);
					history.push('/suscriptores');
				});
		}
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
					Nuevo suscriptor <i className="la la-user-plus" />
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
									value={nombre}
									onChange={(e) => setNombre(e.target.value)}
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
									value={apellido}
									onChange={(e) =>
										setApellido(e.target.value)}
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
									value={carrera}
									onChange={(e) => setCarrera(e.target.value)}
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
									value={noControl}
									onChange={(e) =>
										setNoControl(e.target.value)}
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

export default NuevoSuscriptor;
