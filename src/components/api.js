const APICONFIG = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
	headers: {
		authorization: '940c3e83-f900-4122-a94f-ae7e5ed3dded',
		'Content-Type': 'application/json'
	},
};

export const getApiCards = async () => {
	try {
		const res = await fetch(`${APICONFIG.baseUrl}/cards`, {
			headers: APICONFIG.headers,
		});
		const result = await res.json();
		return result;
	} catch (error) {
		throw error;
	}
};

export const getApiUserInfo = async () => {
	try {
		const res = await fetch(`${APICONFIG.baseUrl}/users/me`, {
			headers: APICONFIG.headers,
		});
		const result = await res.json();
		return result;
	} catch (error) {
		throw error;
	}
};

export const updateApiUserInfo = async (nameUser, description) => {
	try {
		const res = await fetch(`${APICONFIG.baseUrl}/users/me`, {
			method: "PATCH",
			headers: APICONFIG.headers,
			body: JSON.stringify({ name: nameUser, about: description }),
		});
		const result = await res.json();
		return result;
	} catch (error) {
		throw error;
	}
};