function	loginWithUnsplash() {
	const	env = await getEnv();
	const scope = 'public read_user';

	const unsplashAuthUrl = `https://unsplash.com/oauth/authorize?client_id=${env.ACCESS_KEY}&redirect_uri=${env.REDIRECT_URI}&response_type=code&scope=${scope}`;
	const	btn = document.getElementById('loginBtn');

	btn.addEventListener('click', () => {
		window.location.href = unsplashAuthUrl;
	});
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
	loginWithUnsplash();
});
