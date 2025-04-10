const placesList = document.querySelector('.places__list');

const createCard = (item) => {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = item.link;
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => {
		deleteCard(cardElement);
	});
	return cardElement;
}

const deleteCard = (cardElement) => {
	cardElement.remove();
}

const addCardsToList = (initialCards) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	const cards = initialCards.map(createCard);
	cards.forEach(card => placesList.append(card));
}

addCardsToList(initialCards);
