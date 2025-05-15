const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	errorElement.textContent = errorMessage;
	inputElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	if (errorElement) {
		errorElement.textContent = "";
	}
	inputElement.classList.remove(inputErrorClass);
	inputElement.setCustomValidity("");

};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			inputErrorClass
		);
	} else {
		hideInputError(formElement, inputElement, inputErrorClass);
	}
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	buttonElement.classList.toggle(inactiveButtonClass, hasInvalidInput(inputList));
	buttonElement.disabled = hasInvalidInput(inputList);
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => !inputElement.validity.valid);
};

const setEventListeners = (formElement, validationObject) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationObject.inputSelector)
	);
	const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, validationObject.inactiveButtonClass);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", function () {
			checkInputValidity(formElement, inputElement, validationObject.inputErrorClass);
			toggleButtonState(inputList, buttonElement, validationObject.inactiveButtonClass);
		});
	});
};

const enableValidation = (validationObject) => {
	const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, validationObject);
		formElement.addEventListener("submit", function (evt) {
			evt.preventDefault();
		});
	});
};

const clearValidation = (formElement, validationObject) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationObject.inputSelector)
	);
	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, validationObject.inputErrorClass);
	});

	const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
	buttonElement.classList.add(validationObject.inactiveButtonClass);
	buttonElement.disabled = true;
};

export { enableValidation, clearValidation };