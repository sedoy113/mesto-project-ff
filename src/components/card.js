import { initialCards } from './cards.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	cardElement.querySelector('.card__image').src = item.link;
	cardElement.querySelector('.card__image').alt = "Картинка места";
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(cardElement));
	return cardElement;
}

const deleteCard = (cardElement) => cardElement.remove();

export const addCardsToList = (initialCards) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	const cards = initialCards.map(createCard);
	cards.forEach(card => placesList.append(card));
}

addCardsToList(initialCards);