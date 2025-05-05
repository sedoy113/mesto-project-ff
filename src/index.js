import './pages/index.css';
import './images/logo.svg';
import './images/avatar.jpg';
import { initialCards } from './components/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, openPopupFormeditInput, openPopupImage, closePopup } from './components/popup.js';


const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const placesList = document.querySelector('.places__list');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

const popupElementList = document.querySelectorAll('.popup');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const editProfile = document.forms["edit-profile"];
const newPlace = document.forms["new-place"];

profileEditButton.addEventListener('click', () => {
	openPopupFormeditInput(popupTypeEdit, popupInputTypeName, popupInputTypeDescription, profileTitle.textContent, profileDescription.textContent);
});

profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
});


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

const openPopupFormInnerText = (evt) => {
	evt.preventDefault();
	profileTitle.textContent = popupInputTypeName.value;
	profileDescription.textContent = popupInputTypeDescription.value;
	closePopup(popupTypeEdit);
};

const openPopupFormAddCard = (evt) => {
	evt.preventDefault();
	const addName = popupInputTypeCardName.value;
	const addImage = popupInputTypeUrl.value;
	addCreateCard(addName, addImage, (item) => openPopupImage(item, popupTypeImage, popupImage, popupCaption));
	newPlace.reset();
	closePopup(popupTypeNewCard);
};

editProfile.addEventListener('submit', openPopupFormInnerText);
newPlace.addEventListener('submit', openPopupFormAddCard);

// добавить карточку в список из массива данных
const addCardsToList = (initialCards, openPopupImage) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	initialCards.forEach(item => {
		const card = createCard(item, likeCard, openPopupImage, deleteCard);
		placesList.append(card);
	});
}

const addCreateCard = (text, url, openPopupImage) => {
	const newImage = { name: text, link: url };
	const cardElement = createCard(newImage, likeCard, openPopupImage, deleteCard);
	placesList.prepend(cardElement);
}

addCardsToList(initialCards, (item) => openPopupImage(item, popupTypeImage, popupImage, popupCaption));







