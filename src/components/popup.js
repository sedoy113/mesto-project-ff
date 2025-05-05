const openPopup = (popup) => {
	popup.classList.add('popup_is-opened');
	document.addEventListener('keydown', handleEscClose);
};

const closePopup = (popup) => {
	popup.classList.remove('popup_is-opened');
	document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (e) => {
	if (e.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_is-opened');
		if (openedPopup) {
			closePopup(openedPopup);
		}
	}
};

const openPopupImage = (item, popupTypeImage, popupImage, popupCaption) => {
	console.log(item);
	console.log(popupTypeImage);
	popupImage.src = item.link;
	popupImage.alt = item.name;
	popupCaption.textContent = item.name;
	openPopup(popupTypeImage)
}

export { openPopup, closePopup, openPopupImage };