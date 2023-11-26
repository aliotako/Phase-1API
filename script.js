const url = 'https://spotify23.p.rapidapi.com/genre_view/?id=0JQ5DAqbMKFEC4WFtoNRpw&content_limit=10&limit=15';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'de92c1c9f7mshfa6eecf68db49f0p15aae5jsnecf827d8f83f',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}