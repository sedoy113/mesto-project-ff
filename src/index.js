import './pages/index.css';
import './images/logo.svg';
import './images/avatar.jpg';
import './images/edit-avatar-icon.svg';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, openPopupImage, closePopup } from './components/popup.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getApiCards, getApiUserInfo, updateApiUserInfo, updateApiAvatar, updateApiLike, delApiLike, addApiCard, delApiCard } from './components/api.js';

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profilButtonAvatar = document.querySelector('.profile__button-avatar');
const placesList = document.querySelector('.places__list');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupElementList = document.querySelectorAll('.popup');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeDescription = document.querySelector('.popup__input_type_description');
const popupInputTypeAvatar = document.querySelector('.popup__input_type_avatar');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewAvatar = document.querySelector('.popup_type_new-avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const editProfile = document.forms["edit-profile"];
const newPlace = document.forms["new-place"];
const newAvatar = document.forms["new-avatar"];

const validationObject = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

let currentUserId = null;

enableValidation(validationObject);

// Получаем данные пользователя и карточки
Promise.all([getApiUserInfo(), getApiCards()])
	.then(([userData, cardsData]) => {
		currentUserId = userData._id;
		updateProfilApi(userData);
		addCardsToList(cardsData, (item) => openPopupImage(item, popupTypeImage, popupImage, popupCaption));
	})
	.catch((err) => {
		console.log(`Ошибка: ${err}`);
	});

profilButtonAvatar.addEventListener('click', () => {
	openPopup(popupTypeNewAvatar);
	clearValidation(newAvatar, validationObject);
});

profileEditButton.addEventListener('click', () => {
	openPopupFormeditInput(popupTypeEdit, popupInputTypeName, popupInputTypeDescription, profileTitle.textContent, profileDescription.textContent);
	clearValidation(editProfile, validationObject);
});

profileAddButton.addEventListener('click', () => {
	openPopup(popupTypeNewCard);
	clearValidation(newPlace, validationObject);
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
	const name = popupInputTypeName.value;
	const about = popupInputTypeDescription.value;
	updateApiUserInfo(name, about)
		.then((user) => {
			updateProfilApi(user);
			closePopup(popupTypeEdit);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
}

const openPopupFormInnerAvatar = (evt) => {
	evt.preventDefault();
	const link = popupInputTypeAvatar.value;
	updateApiAvatar(link)
		.then((user) => {
			updateProfilApi(user);
			closePopup(popupTypeNewAvatar);
			newAvatar.reset();
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
}

const updateProfilApi = (user) => {
	profileTitle.textContent = user.name;
	profileDescription.textContent = user.about;
	profileImage.style.backgroundImage = `url(${user.avatar})`;
};

const openPopupFormAddCard = (evt) => {
	evt.preventDefault();
	const addName = popupInputTypeCardName.value;
	const addImage = popupInputTypeUrl.value;

	addApiCard({ name: addName, link: addImage })
		.then((newCardFromServer) => {
			const cardElement = createCard(
				newCardFromServer,
				currentUserId,
				likeCard,
				(item) => openPopupImage(item, popupTypeImage, popupImage, popupCaption),
				(cardElement, cardId) => deleteCard(cardElement, cardId, delApiCard),
				updateApiLike,
				delApiLike
			);
			placesList.prepend(cardElement);
			newPlace.reset();
			closePopup(popupTypeNewCard);
		})
		.catch((err) => {
			console.error('Ошибка при добавлении карточки:', err);
		});
};

const openPopupFormeditInput = (popupTypeEdit, popupInputTypeName, popupInputTypeDescription, title, description) => {
	popupInputTypeName.value = title;
	popupInputTypeDescription.value = description;
	openPopup(popupTypeEdit);
}

editProfile.addEventListener('submit', openPopupFormInnerText);
newPlace.addEventListener('submit', openPopupFormAddCard);
newAvatar.addEventListener('submit', openPopupFormInnerAvatar);

const addCardsToList = (initialCards, openPopupImage) => {
	if (!initialCards.length) {
		console.warn('Нет данных в массиве');
		return;
	}
	initialCards.forEach(item => {
		const card = createCard(
			item,
			currentUserId,
			likeCard,
			(item) => openPopupImage(item, popupTypeImage, popupImage, popupCaption),
			(cardElement, cardId) => deleteCard(cardElement, cardId, delApiCard),
			updateApiLike,
			delApiLike
		);
		placesList.append(card);
	});
}