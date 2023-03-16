import axios from 'axios';

const BASE_URL = 'https://mocki.io/v1/761966f5-8c6a-4a78-8434-d1a1f7e62003';

function fetchData(callback) {
	axios
		.get(BASE_URL)
		.then((response) => {
			callback(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
}

export default fetchData;
