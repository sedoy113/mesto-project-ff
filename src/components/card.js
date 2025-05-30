
const cardTemplate = document.querySelector('#card-template').content;
const createCard = (item, likeCard, openPopupImage, deleteCard, updateApiLike) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	const cardLikeNumber = cardElement.querySelector('.card__like-number');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardTitle.textContent = item.name;
	cardLikeNumber.textContent = item.likes.length;

	cardImage.addEventListener('click', () => openPopupImage(item));

	cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => likeCard(evt, item, updateApiLike, cardLikeNumber));

	deleteButton.addEventListener('click', () => deleteCard(cardElement));

	return cardElement;
}

const likeCard = (evt, item, updateApiLike, cardLikeNumber) => {
	const cardId = item._id;
	console.log(cardId);
	const likeRequest = updateApiLike(cardId);
	likeRequest
		.then((cardId) => {
			console.log(cardId);
			cardLikeNumber.textContent = cardId.likes.length;
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
	evt.target.classList.toggle('card__like-button_is-active');
}

const deleteCard = (cardElement) => cardElement.remove();
// новая карточка в список

export { createCard, likeCard, deleteCard };
