export const enableValidation = (setting) => {
	const formList = Array.from(document.querySelectorAll(setting.formSelector));
	formList.forEach((formElement) => {
		console.log(formElement);
	});
};