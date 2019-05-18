import types from '../_Actions/Types';

const INITIAL_STATE = { 
	isLoading: false,
	list: [],
	error: null,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {	
		case types.FETCH_WEATHER_START:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case types.FETCH_WEATHER_SUCCESS:
			return {
				...state,
				list: payload.list,
			};
		case types.FETCH_WEATHER_FAILED:
			return {
				...state,
				error: payload.message,
			};		
		default:
		  return state;
	}
}