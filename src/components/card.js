const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, likeCard, popupImage, deleteCard) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardTitle = cardElement.querySelector('.card__title');
	const deleteButton = cardElement.querySelector('.card__delete-button');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardTitle.textContent = item.name;

	cardImage.addEventListener('click', () => popupImage(item));

	cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

	deleteButton.addEventListener('click', () => deleteCard(cardElement));

	return cardElement;
}

const likeCard = (evt) => {
	evt.target.classList.toggle('card__like-button_is-active');
}

const deleteCard = (cardElement) => cardElement.remove();
// новая карточка в список
const addCreateCard = (text, url, popupImage) => {
	const newImage = { name: text, link: url };
	const cardElement = createCard(newImage, likeCard, popupImage, deleteCard);
	placesList.prepend(cardElement);
}



// добавить карточку в список из массива данных
const addCardsToList = (initialCards, popupImage) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	const cards = initialCards.map(item => createCard(item, likeCard, popupImage, deleteCard));
	cards.forEach(card => placesList.append(card));
}

export { addCardsToList, addCreateCard };
