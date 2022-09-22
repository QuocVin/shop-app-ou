import { optionsGen } from '../../helpers/utils'

export const userKey = [
	'user_id',
	'username',
	'name',
	'date_ob',
	'gen',
	'phone',
]

export const formFields = (onChangeDatePicker, valueDatePicker) => {
	return [
		{ id: 'name', label: { title: 'Tên người dùng' }, xs: 12, component: { textField: true }, required: true, },
		{ id: 'gen', label: { title: 'Giới tính' }, xs: 10, component: { radio: true }, options: optionsGen, required: true },
		{ id: 'date_ob', label: { title: 'Ngày sinh' }, xs: 10, component: { datePicker: true }, required: true, onChangeDatePicker: onChangeDatePicker, value: valueDatePicker },
		{ id: 'phone', label: { title: 'Số điện thoại' }, xs: 10, component: { textField: true }, type: 'number' },
	]
}

export const ProfileOrderColumns = [
	{
		id: "product_name",
		name: "Tên sản phẩm",
		width: 250,
	},
	{
		id: "total_qty",
		name: "Số lượng",
		width: 100,
		align: 'right'
	},
	{
		id: "total_price",
		name: "Tổng giá",
		width: 170,
		format: 'price',
		align: 'right'
	},
	{
		id: "update_date",
		name: "Ngày thực hiện",
		width: 130,
		format: 'date',
		align: 'center'
	},
]