const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, userId, likeCard, openPopupImage, deleteCard, updateApiLike, delApiLike) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeNumber = cardElement.querySelector('.card__like-number');
	const cardLikeButton = cardElement.querySelector('.card__like-button');

	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardTitle.textContent = item.name;
	cardLikeNumber.textContent = item.likes.length;

	const likes = item.likes || [];
	cardLikeNumber.textContent = likes.length;

	const isLiked = likes.some(like => like._id === userId);
	if (isLiked) {
		cardLikeButton.classList.add('card__like-button_is-active');
	}

	// Показываем кнопку удаления только для своих карточек
	if (item.owner && item.owner._id === userId) {
		deleteButton.style.display = 'block';
	} else {
		deleteButton.style.display = 'none';
	}
	cardImage.addEventListener('click', () => openPopupImage(item));

	cardLikeButton.addEventListener('click', () => likeCard(item, cardLikeButton, cardLikeNumber, updateApiLike, delApiLike));

	deleteButton.addEventListener('click', () => deleteCard(cardElement, item._id));

	return cardElement;
}

const likeCard = (item, cardLikeButton, cardLikeNumber, updateApiLike, delApiLike) => {
	const cardId = item._id;
	const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
	const likeRequest = isLiked ? delApiLike(cardId) : updateApiLike(cardId);

	likeRequest
		.then((res) => {
			cardLikeButton.classList.toggle('card__like-button_is-active');
			cardLikeNumber.textContent = res.likes.length;
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
}

// const deleteCard = (cardElement) => cardElement.remove();
const deleteCard = (cardElement, cardId, delApiCard) => {
	delApiCard(cardId)
		.then(() => {
			cardElement.remove();
		})
		.catch((err) => {
			console.error('Ошибка при удалении карточки:', err);
		});
};


export { createCard, likeCard, deleteCard };