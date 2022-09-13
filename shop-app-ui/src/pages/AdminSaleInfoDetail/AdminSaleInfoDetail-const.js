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
		{ id: 'category_id', label: { title: 'Loại sản phẩm', checkboxLabel: '' }, xs: 4, component: { selectBox: true }, options: options1, required: true },
		{ id: 'product_id', label: { title: 'Loại', checkboxLabel: '' }, xs: 4, component: { selectBox: true }, options: options2, required: true },
		{ id: 'content', label: { title: 'Nội dung bài viết' }, xs: 12, component: { textField: true }, multiline: true, rows: 9, labelClass: { height: '208px' } },
	]
}