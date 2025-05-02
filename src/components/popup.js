import { profileTitle, profileDescription, addCreateCard } from '../index.js';

const popupElementList = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editProfile = document.forms["edit-profile"];
const newPlace = document.forms["new-place"];

const handleEscClose = (e) => {
	if (e.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			closePopup(openedPopup);
		}
	}
};


popupElementList.forEach((popup) => {
	popup.classList.add('popup_is-animated');
	popup.addEventListener('click', (e) => {
		if (e.target === popup) closePopup(popup);
	});
	const popupCloseList = popup.querySelector('.popup__close');
	if (popupCloseList) {
		popupCloseList.addEventListener('click', () => closePopup(popup));
	}
});

const openPopupImage = (item) => {
	popupImage.src = item.link;
	popupImage.alt = item.name;
	popupCaption.textContent = item.name;
	openPopup(popupTypeImage)
}

const openPopupFormeditInput = () => {
	popupInputTypeName.value = profileTitle.textContent;
	popupInputTypeDescription.value = profileDescription.textContent;
	openPopup(popupTypeEdit)
}

const openPopupFormInnerText = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = popupInputTypeName.value;
	profileDescription.textContent = popupInputTypeDescription.value;

	closePopup(popupTypeEdit);
}

const openPopupFormAddCard = (evt) => {
	evt.preventDefault();
	const addName = popupInputTypeCardName.value;
	const addImage = popupInputTypeUrl.value;

	addCreateCard(addName, addImage, openPopupImage);
	newPlace.reset();
	closePopup(popupTypeNewCard);
}

const openPopup = (popup) => {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', handleEscClose);
};

const closePopup = (popup) => {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', handleEscClose);
};


editProfile.addEventListener('submit', openPopupFormInnerText);
newPlace.addEventListener('submit', openPopupFormAddCard);

export { openPopup, openPopupFormeditInput, popupTypeNewCard, openPopupImage };