const	http = require('http');
const	fs = require('fs');
const	path = require('path');

const	homePage = fs.readFileSync('./unsplash-app/home/index.html');
const	homeStyles = fs.readFileSync('./unsplash-app/home/homeStyles.css');
const	homeLogic = require('./unsplash-app/home/homeScript.js');
const	loginPage = fs.readFileSync('./unsplash-app/login/login.html');
const	loginStyles = fs.readFileSync('./unsplash-app/login/loginStyles.css');
const	loginLogic = require('./unsplash-app/login/loginScript.js');

const	server = http.createServer(async (req, res) => {
	if (req.url === '/') {
		//res.writeHead(200, {'content-type': 'text/html'});
		//res.write(homePage);
		res.end(homePage);
		try {
			// Llamar a la función que hace la solicitud a la API de Unsplash
			const images = await runHomeLogic();
			console.log(images ? "HOLA" : "ADIOS");
			// Generar el HTML con las imágenes
			const imagesHtml = images.map(photo => {
			  return `<img src="${photo.urls.small}" alt="${photo.alt_description || 'Imagen de Unsplash'}" style="max-width:300px;margin:10px;">`;
			}).join('');
	  
			// Enviar la respuesta con el HTML
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(`
				<!DOCTYPE html>
				<html lang="es">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Galería de Unsplash</title>
					<style>
					body {
						font-family: Arial, sans-serif;
						text-align: center;
					}
					.gallery {
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
					}
					img {
						max-width: 300px;
						border-radius: 5px;
						box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
					}
					</style>
				</head>
				<body>
					<h1>Galería de Imágenes de Unsplash</h1>
					<div class="gallery">
					${imagesHtml}
					</div>
				</body>
				</html>
				`);
			} catch (error) {
				// Manejo del error si la petición a Unsplash falla
				//res.writeHead(500, { 'Content-Type': 'text/plain' });
				console.log('Error al obtener imágenes de Unsplash');
			}
		res.end();
	}
	else if (req.url === '/homeStyles.css') {
		res.writeHead(200, {'content-type': 'text/css'});
		res.write(homeStyles);
		res.end();
	}
	else if (req.url === '/run-home-logic') {
		homeLogic.runHomeLogic();
	}
	/* else if (req.url === '/homeScript.js') {
		res.writeHead(200, {'content-type': 'text/javascript'});
		res.write(homeLogic);
		res.end();
	} */
	else if (req.url === '/login') {
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(loginPage);
		res.end();
	}
	else if (req.url === '/loginStyles.css') {
		res.writeHead(200, {'content-type': 'text/css'});
		res.write(loginStyles);
		res.end();
	}
	/* else if (req.url === '/loginScript.js') {
		res.writeHead(200, {'content-type': 'text/javascript'});
		res.write(loginLogic);
		res.end();
	} */
	else {
		res.writeHead(404, {'content-type': 'text/html'});
		res.write('<h1>404, Resource Not Found</h1> <a href="/">Go back Home</a>');
		res.end();
	}
})

server.listen(5000, () => {
	console.log('Server listening at port 5000');
})