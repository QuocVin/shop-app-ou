export const infoRequest = (formData, formInfo) => {
	const { formType, auth, note } = formInfo
	if (formType === 'insert') {
		formData.created_date = new Date();
		formData.created_by = auth;
		formData.created_note = note;
		formData.update_date = new Date();
		formData.update_by = auth;
		formData.update_note = 'build act create new product';
	} else {
		formData.update_date = new Date();
		formData.update_by = auth;
		formData.update_note = note;
	}
}