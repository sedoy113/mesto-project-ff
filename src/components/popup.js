
const popupElement = document.querySelectorAll('.popup');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const openPopup = (popup) => {
	popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => {
	popup.classList.remove('popup_is-opened');
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

export { openPopup, popupTypeEdit, popupTypeNewCard, popupTypeImage };