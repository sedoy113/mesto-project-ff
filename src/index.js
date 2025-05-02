import './pages/index.css';
import './images/logo.svg';
import './images/avatar.jpg';
import { initialCards } from './components/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, popupFormeditInput, popupTypeNewCard, popupImage } from './components/popup.js';


const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');

profileEditButton.addEventListener('click', () => {
	popupFormeditInput();
});

profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});

// добавить карточку в список из массива данных
const addCardsToList = (initialCards, popupImage) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	initialCards.forEach(item => {
		const card = createCard(item, likeCard, popupImage, deleteCard);
		placesList.append(card);
	});
}

const addCreateCard = (text, url, popupImage) => {
	const newImage = { name: text, link: url };
	const cardElement = createCard(newImage, likeCard, popupImage, deleteCard);
	placesList.prepend(cardElement);
}

addCardsToList(initialCards, popupImage);

export { profileTitle, profileDescription, addCreateCard };







