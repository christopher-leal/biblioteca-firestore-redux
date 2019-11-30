import { BUSQUEDA_EXITOSA, BUSQUEDA_ERROR } from '../actions/types';

const initialState = {};

const buscarUsuarioReducer = (state = initialState, action) => {
	switch (action.type) {
		case BUSQUEDA_EXITOSA:
			return {
				nombre: action.payload.nombre,
				apellido: action.payload.apellido,
				noControl: action.payload.noControl,
				carrera: action.payload.carrera
			};
		case BUSQUEDA_ERROR:
			return {};
		default:
			return state;
	}
};
export default buscarUsuarioReducer;
