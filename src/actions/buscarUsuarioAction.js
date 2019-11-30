import { BUSQUEDA_EXITOSA, BUSQUEDA_ERROR } from '../actions/types';

export const buscarUsuarioAction = (suscriptor) => {
	return (dispatch) => {
		if (Object.keys(suscriptor).length !== 0) {
			dispatch(busquedaExitosa(suscriptor));
		} else {
			dispatch(busquedaError());
		}
	};
};

export const busquedaExitosa = (suscriptor) => {
	return {
		type: BUSQUEDA_EXITOSA,
		payload: suscriptor
	};
};
export const busquedaError = () => ({
	type: BUSQUEDA_ERROR
});
