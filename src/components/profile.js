import { openPopup, popupTypeEdit, popupTypeNewCard } from './popup.js';

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');



profileEditButton.addEventListener('click', () => {
	openPopup(popupTypeEdit);
});


profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});
