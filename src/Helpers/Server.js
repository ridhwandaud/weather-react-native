
import axios from 'axios';

const serverInstance = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/',
	timeout: 10000, /* Timeout for 10 seconds */
});

export default serverInstance;