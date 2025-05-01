import { popupImage } from './popup.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const createCard = (item, likeCard) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardElement.querySelector('.card__title').textContent = item.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', () => deleteCard(cardElement));

	cardImage.addEventListener('click', () => popupImage(item));

	cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

	return cardElement;
}

const likeCard = (evt) => {
	evt.target.classList.toggle('card__like-button_is-active');
}

const addCreateCard = (text, url) => {
	const newImage = { name: text, link: url };
	const cardElement = createCard(newImage, likeCard);
	placesList.prepend(cardElement);
}

const deleteCard = (cardElement) => cardElement.remove();

const addCardsToList = (initialCards) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	const cards = initialCards.map(item => createCard(item, likeCard));
	cards.forEach(card => placesList.append(card));
}

export { addCardsToList, addCreateCard };
