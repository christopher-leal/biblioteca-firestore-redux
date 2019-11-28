import React from 'react';

const FichaSuscriptor = ({ suscriptor, solicitarPrestamo }) => {
	return (
		<div className="card my-3">
			<h3 className="card-header bg-primary text-white">
				Datos solicitante
			</h3>
			<div className="card-body">
				<p>
					<span className="font-weight-bold">Nombre: </span>
					{suscriptor.nombre} {suscriptor.apellido}
				</p>
				<p>
					<span className="font-weight-bold">No. Control: </span>
					{suscriptor.noControl}
				</p>
				<p>
					<span className="font-weight-bold">Carrera: </span>
					{suscriptor.carrera}
				</p>
				<button
					className="btn btn-primary btn-block"
					onClick={() => solicitarPrestamo()}
				>
					Solicitar Prestamo
				</button>
			</div>
		</div>
	);
};

export default FichaSuscriptor;
