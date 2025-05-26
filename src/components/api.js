const APICONFIG = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
	headers: {
		authorization: '940c3e83-f900-4122-a94f-ae7e5ed3dded',
		'Content-Type': 'application/json'
	},
};

export const getApiCards = async () => {
	const res = await fetch(`${APICONFIG.baseUrl}/cards`, {
		headers: APICONFIG.headers,
	});
	const result = await res.json();
	return result;
};