const popupElement = document.querySelectorAll('.popup');
const popupClose = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

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

export { openPopup, popupTypeEdit, popupTypeNewCard, popupTypeImage };