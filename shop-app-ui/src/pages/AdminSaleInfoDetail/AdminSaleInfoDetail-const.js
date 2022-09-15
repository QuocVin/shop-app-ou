export const productKey = [
	'product_id',
	'name',
	'price',
	'stored_qty',
	'category_id',
	'description',
]

export const formFields = (options1, options2) => {
	return [
		{ id: 'title', label: { title: 'Tiêu đề bài viết' }, xs: 12, component: { textField: true }, required: true },
		{ id: 'price', label: { title: 'Giá bán' }, xs: 5, component: { textField: true }, type: 'number', disabled: true },
		{ id: 'stored_qty', label: { title: 'Số lượng kho' }, xs: 5, component: { textField: true }, type: 'number', disabled: true },
		// { id: 'category_id', label: { title: 'Loại sản phẩm', checkboxLabel: '' }, xs: 4, component: { selectBox: true }, options: options1, required: true },
		// { id: 'product_id', label: { title: 'Sản phẩm', checkboxLabel: '' }, xs: 6, component: { selectBox: true }, options: options2, required: true },
		{ id: 'content', label: { title: 'Nội dung bài viết' }, xs: 12, component: { textField: true }, multiline: true, rows: 9, labelClass: { height: '208px' } },
	]
}

export const AdminProductColumns = [
	{
		id: "name",
		name: "Tên sản phẩm",
		width: 350,
	},
	{
		id: "price",
		name: "Giá bán",
		width: 120,
		align: 'right'
	},
	{
		id: "stored_qty",
		name: "Kho",
		width: 120,
		align: 'right'
	},
	{
		id: "category_id",
		name: "Loại hàng",
		width: 160,
		fillCategory: true,
		align: 'center'
	},
]