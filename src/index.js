import './pages/index.css';
import './images/logo.svg';
import './images/avatar.jpg';
import { initialCards } from './components/cards.js';
import { addCardsToList } from './components/card.js';
import { openPopup, popupFormeditInput, popupTypeNewCard, popupImage } from './components/popup.js';


const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
	popupFormeditInput();
});

profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});


addCardsToList(initialCards, popupImage);

export { profileTitle, profileDescription };







