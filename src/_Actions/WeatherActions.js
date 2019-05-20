import { API_KEY } from '../Helpers/Constants';
import types from './Types';
import Server from '../Helpers/Server';

const fetchWeatherStart = () => ({ type: types.FETCH_WEATHER_START });

const fetchWeather = (params) => {

	console.log('params', params);
	return (dispatch, getState) => {
		const { lat, lng } = params;
	  	dispatch(fetchWeatherStart());
		Server.get(`forecast?lat=${lat}&lon=${lng}&appid=eb8a362432da223838169af4b1ce7649&units=imperial`)
		.then(({ data }) => {
			dispatch({
				type: types.FETCH_WEATHER_SUCCESS,
				payload: data
			});
		})
		.catch((error) => {
			dispatch({
				type: types.FETCH_WEATHER_FAILED,
				payload: error
			});

		});
	};
};

const getCurrentLocation = () => {
	return (dispatch, getState) => {
		navigator.geolocation.getCurrentPosition((position) => {

				let params = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				dispatch(fetchWeather(params));
			},
			//callback error
			(error) => { console.log('error', error)},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
		);
	};
};

export default {
	getCurrentLocation
};