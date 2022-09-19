export const infoRequest = (formData, formInfo) => {
	const { formType, auth, note } = formInfo
	if (formType === 'insert') {
		formData.created_date = new Date();
		formData.created_by = auth;
		formData.created_note = note;
		formData.update_date = new Date();
		formData.update_by = auth;
		formData.update_note = note;
	} else {
		formData.update_date = new Date();
		formData.update_by = auth;
		formData.update_note = note;
	}
}

export const rolePaths = {
	CUSTOMER: 'register',
	EMPLOYEE: 'manager',
	ADMIN: 'admin',
}

export const optionsGen = [
	{ id: 'm', label: 'Nam' },
	{ id: 'f', label: 'Nữ' },
]