import { dev } from '$app/environment';

export async function load({ fetch }) {
	const res = await fetch(
		`${
			dev ? 'http://localhost:8888' : 'https://math-jeopardy.netlify.app'
		}/.netlify/functions/questions`
	);
	const response = await res.json();
	console.log(response);

	return { response };
}
