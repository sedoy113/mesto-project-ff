const APICONFIG = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
	headers: {
		authorization: '940c3e83-f900-4122-a94f-ae7e5ed3dded',
		'Content-Type': 'application/json'
	},
};
const fetchData = async (url, options = {}) => {
	try {
		const res = await fetch(url, options);
		if (!res.ok) {
			throw new Error(`Ошибка: ${res.status}`);
		}
		const result = await res.json();
		return result;
	} catch (error) {
		console.error('Ошибка:', error);
		throw error;
	}
};

export const getApiCards = async () => {
	return fetchData(`${APICONFIG.baseUrl}/cards`, { headers: APICONFIG.headers });
};

export const getApiUserInfo = async () => {
	return fetchData(`${APICONFIG.baseUrl}/users/me`, { headers: APICONFIG.headers });
};

export const updateApiUserInfo = async (nameUser, description) => {
	return fetchData(`${APICONFIG.baseUrl}/users/me`, {
		method: "PATCH",
		headers: APICONFIG.headers,
		body: JSON.stringify({ name: nameUser, about: description }),
	});
};

export const updateApiAvatar = async (avatarUrl) => {
	return fetchData(`${APICONFIG.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: APICONFIG.headers,
		body: JSON.stringify({ avatar: avatarUrl }),
	});
};

export const updateApiLike = async (cardId) => {
	return fetchData(`${APICONFIG.baseUrl}/cards/likes/${cardId}`, {
		method: "PUT",
		headers: APICONFIG.headers,
	});
};

export const delApiLike = async (cardId) => {
	return fetchData(`${APICONFIG.baseUrl}/cards/likes/${cardId}`, {
		method: "DELETE",
		headers: APICONFIG.headers,
	});
};

export const addApiCard = async ({ name, link }) => {
	const result = await fetchData(`${APICONFIG.baseUrl}/cards`, {
		method: "POST",
		headers: APICONFIG.headers,
		body: JSON.stringify({ name, link }),
	});
	if (!result.likes) {
		result.likes = [];
	}
	return result;
};

export const delApiCard = async (cardId) => {
	return fetchData(`${APICONFIG.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headers: APICONFIG.headers,
	});
};
