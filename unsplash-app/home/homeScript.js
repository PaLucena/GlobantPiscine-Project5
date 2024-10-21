const	fs = require('fs');
const	path = require('path');
const	http = require('http');

console.log("Location: /unsplash-app/home/homeScript.js")

function	runHomeLogic() {
	const	envPath = path.resolve(__dirname, '../../.env');
	const	querySearch = 'nature';

	fs.readFile(envPath, 'utf-8', (err, data) => {
		if (err) {
			console.error('Error at reading .env file:', err);
		}

		const	envVars = data.split('\n').reduce((acc, line) => {
			if (line && !line.startsWith('#')) {
				const	[key, value] = line.split('=');
				acc[key.trim()] = value.trim();
			}
			return acc
		}, {});

		const	url = `https://api.unsplash.com/search/photos?query=${querySearch}&per_page=10&client_id=${envVars.ACCESS_KEY}`;

		fetch(url)
		.then (response => {
			if (!response.ok) {
				throw new Error('Error at API response');
			}
			return response.json();
		})
		.then (data => {
			//console.log('Response from API:', data);
			return (data.results);
		})
		.catch(error => {
			console.error("Error (getData):", error);
		})
	});
}

module.exports = { runHomeLogic };
