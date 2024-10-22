const	http = require('http');
const	fs = require('fs');
const	path = require('path');

//const	homePage = fs.readFileSync('./unsplash-app/home/index.html');
//const	homeStyles = fs.readFileSync('./unsplash-app/home/homeStyles.css');
//const	homeLogic = require('./unsplash-app/home/homeScript.js');
const	loginPage = fs.readFileSync('./unsplash-app/login/login.html');
const	loginStyles = fs.readFileSync('./unsplash-app/login/loginStyles.css');
const	loginLogic = require('./unsplash-app/login/loginScript.js');


const	server = http.createServer(async (req, res) => {
	const	envVars = await getEnvVars();
	if (req.url === '/') {
		fs.readFile(path.join(__dirname, 'unsplash-app/home/index.html'), (err, content) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Internal server error');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/homeStyles.css') {
		fs.readFile(path.join(__dirname, 'unsplash-app/home/homeStyles.css'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('CSS not found');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/css' });
				res.end(content);
			}
		});
	}
	else if (req.url === '/homeScript.js') {
		fs.readFile(path.join(__dirname, 'unsplash-app/home/homeScript.js'), (err, content) => {
			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('JavaScript not found');
			} else {
				res.writeHead(200, { 'Content-Type': 'application/javascript' });
				res.end(content);
			}
		});
	}
	else if (req.url === "/api/envVars") {
		console.log("At patata:", envVars);
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(envVars);
	}
	else if (req.url === '/login') {
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(loginPage);
		res.end();
	}
	/* else if (req.url === '/loginStyles.css') {
		res.writeHead(200, {'content-type': 'text/css'});
		res.write(loginStyles);
		res.end();
	} */
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

function	getEnvVars() {
	const	envPath = path.resolve(__dirname, '.env');

	return new Promise((resolve, reject) => {
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

			resolve (JSON.stringify(envVars))
		});
	});
}
