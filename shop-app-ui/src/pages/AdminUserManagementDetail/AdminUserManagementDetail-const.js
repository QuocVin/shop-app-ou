export const userKey = [
	'user_id',
	'username',
	'name',
	'date_ob',
	'gen',
	'phone',
]

export const formFields = () => {
	return [
		{ id: 'username', label: { title: 'Tên tài khoản' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'name', label: { title: 'Tên người dùng' }, xs: 12, component: { textField: true }, required: true, },
		{ id: 'gen', label: { title: 'Giới tính' }, xs: 5, component: { textField: true }, required: true },
		{ id: 'date_ob', label: { title: 'Ngày sinh' }, xs: 5, component: { textField: true }, required: true, },
		{ id: 'phone', label: { title: 'Số điện thoại' }, xs: 5, component: { textField: true }, required: true, type: 'number' },
	]
}