import { profileTitle, profileDescription } from './profile.js';

const popupElement = document.querySelectorAll('.popup');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupForm = document.querySelector('.popup__form');


const openPopup = (popup) => {
	popup.classList.add('popup_is-opened');

	const handleEscClose = (e) => {
		if (e.key === 'Escape') {
			closePopup(popup);
		}
	};

	document.addEventListener('keydown', handleEscClose);
	popup.escHandler = handleEscClose;
};

const closePopup = (popup) => {
	popup.classList.remove('popup_is-opened');

	if (popup.escHandler) {
		document.removeEventListener('keydown', popup.escHandler);
		delete popup.escHandler;
	}
};

popupElement.forEach((popup) => {
	popup.addEventListener('click', (e) => {
		if (e.target === popup) closePopup(popup);
	});
});

popupClose.forEach((button) => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup');
		closePopup(popup);
	});
});

const popupFormeditInput = () => {
	popupForm.querySelector('.popup__input_type_name').value = profileTitle.textContent;
	popupForm.querySelector('.popup__input_type_description').value = profileDescription.textContent;
}

const popupFormInnerText = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = popupForm.querySelector('.popup__input_type_name').value;
	profileDescription.textContent = popupForm.querySelector('.popup__input_type_description').value;
	closePopup(popupTypeEdit);
}

popupForm.addEventListener('submit', popupFormInnerText);

export { openPopup, popupFormeditInput, popupTypeEdit, popupTypeNewCard, popupTypeImage };