import { API_KEY } from '../Helpers/Constants';
import types from './Types';
import Server from '../Helpers/Server';

const fetchWeatherStart = () => ({ type: types.FETCH_WEATHER_START });

const fetchWeather = () => {
	return (dispatch, getState) => {
	  	dispatch(fetchWeatherStart());
		Server.get(`forecast?lat=3.17&lon=101.5&appid=eb8a362432da223838169af4b1ce7649&units=imperial`)
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

export default {
	fetchWeather
};