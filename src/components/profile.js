import { openPopup, popupFormeditInput, popupTypeEdit, popupTypeNewCard } from './popup.js';

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
	popupFormeditInput();
	openPopup(popupTypeEdit)
});


profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});

export { profileTitle, profileDescription };


