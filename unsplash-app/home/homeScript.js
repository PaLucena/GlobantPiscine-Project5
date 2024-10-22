async function	eventListener() {
	const	queryForm = document.getElementById('queryForm');
	const	searchButton = document.getElementById('searchButton');

	queryForm.addEventListener('submit', function(event) {
		event.preventDefault();
		const query = document.querySelector('input').value;
		accessAPI(query);
	});

	searchButton.addEventListener('click', () => {
		const query = document.getElementById('queryInput').value;
		accessAPI(query);
	});
}

async function	accessAPI(querySearch) {
	const	env = await getEnv();
	const	url = `https://api.unsplash.com/search/photos?query=${querySearch}&per_page=10&client_id=${env.ACCESS_KEY}`;

	fetch(url)
	.then (response => {
		if (!response.ok) {
			throw new Error('Error at API response');
		}
		return response.json();
	})
	.then (data => {
		let imagesHtml = data.results.map(photo => {
			return `<img src="${photo.urls.small}" alt="${photo.alt_description || 'Imagen de Unsplash'}" style="max-width:300px;margin:10px;">`;
		}).join('');

		document.getElementById('gallery').innerHTML = imagesHtml;
	})
	.catch(error => {
		console.error("Error (getData):", error);
	})
}

async function	getEnv() {
	try {
		const	response = await fetch("/api/envVars");
		if (!response.ok)
			throw new Error(response.status);
		const	data = await response.json();
		return data;
	}
	catch (error) {
		console.error("Error (getEnv):", error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	eventListener();
});
