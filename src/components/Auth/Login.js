import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';
import Swal from 'sweetalert2';

const Login = () => {
	const firebase = useFirebase();
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await firebase
			.login({
				email,
				password
			})
			.then((result) => {
				Swal.fire(
					'Buen trabajo',
					'Iniciaste sesion correctamente',
					'success'
				);
			})
			.catch((e) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Usuario y/o contraseña incorrectos'
				});
			});
	};
	return (
		<div className="row justify-content-center">
			<div className="col-md-5">
				<div className="card mt-5">
					<div className="card-body">
						<h2 className="py-4 text-center">
							Iniciar sesion <i className="la la-lock" />
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									className="form-control"
									name="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									required
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								value="Login"
								className="btn btn-success btn-block"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
