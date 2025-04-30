import { initialCards } from './cards.js';
import { popupImage } from './popup.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	cardImage.src = item.link;
	cardImage.alt = "Картинка места";
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(cardElement));

	cardImage.addEventListener('click', () => {
		popupImage(item);
	});

	return cardElement;
}

const addCreateCard = (text, url) => {
	const newImage = { name: text, link: url };
	const cardElement = createCard(newImage);
	placesList.prepend(cardElement);
}

const deleteCard = (cardElement) => cardElement.remove();

const addCardsToList = (initialCards) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	const cards = initialCards.map(createCard);
	cards.forEach(card => placesList.append(card));
}

addCardsToList(initialCards);

export { addCardsToList, addCreateCard };
