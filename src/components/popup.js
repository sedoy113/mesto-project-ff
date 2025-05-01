import { profileTitle, profileDescription } from './profile.js';
import { addCreateCard } from './card.js';

const popupElement = document.querySelectorAll('.popup');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const editProfile = document.forms["edit-profile"];
const newPlace = document.forms["new-place"];

popupElement.forEach((popup) => {
	popup.classList.add('popup_is-animated');
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

const popupImage = (item) => {
	popupTypeImage.querySelector('.popup__image').src = item.link;
	popupTypeImage.querySelector('.popup__image').alt = item.name;
	popupTypeImage.querySelector('.popup__caption').textContent = item.name;
	openPopup(popupTypeImage)
}

const popupFormeditInput = () => {
	console.log("click");
	editProfile.querySelector('.popup__input_type_name').value = profileTitle.textContent;
	editProfile.querySelector('.popup__input_type_description').value = profileDescription.textContent;
	openPopup(popupTypeEdit)
}

const popupFormInnerText = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = editProfile.querySelector('.popup__input_type_name').value;
	profileDescription.textContent = editProfile.querySelector('.popup__input_type_description').value;
	closePopup(popupTypeEdit);
}

const popupFormAddCard = (evt) => {
	evt.preventDefault();
	const addName = newPlace.querySelector('.popup__input_type_card-name').value;
	const addImage = newPlace.querySelector('.popup__input_type_url').value;

	addCreateCard(addName, addImage);
	newPlace.reset();
	closePopup(popupTypeNewCard);
}

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

editProfile.addEventListener('submit', popupFormInnerText);
newPlace.addEventListener('submit', popupFormAddCard);

export { openPopup, popupFormeditInput, popupImage, popupTypeNewCard };