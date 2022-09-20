export const AdminSaleInfoColumns = [
	{
		id: "title",
		name: "Tiêu đề bài viết",
		width: 250,
	},
	{
		id: "product_name",
		name: "Sản phẩm",
		width: 200,
	},
	{
		id: "created_date",
		name: "Ngày đăng",
		width: 110,
		format: 'date',
		align: 'center'
	},
	{
		id: "validationflag",
		name: "Trạng thái",
		width: 150,
		format: 'validation',
		align: 'center'
	},
	{
		id: "update_note",
		name: "Nội dung thực hiện",
		width: 250,
	},
]

export const formSearch = [
	{ id: 'title', label: 'Tiêu đề bài viết', xs: 3, component: { textField: true } },
]