import axios from 'axios';

export let endpoints = {
	'login': '/api/authenticate',
	'register': '/api/users/createUser',

	'admin/user': (params, page) => '/api/users/getPages' + `?page=${page || 1}` + params,
	'admin/user/id': (params) => '/api/users/detail' + `?user_id=${params}`,
	'admin/update-user': '/api/users/update',
	'admin/create-new-user': '/api/users/insert',
	'admin/delete-user': '/api/users/remove',

	'admin/product': (params, page) => '/api/products/getPageProducts' + `?page=${page || 1}` + params,
	'admin/product/id': (params) => '/api/products/detail' + `?product_id=${params}`,
	'admin/update-product': '/api/products/update',
	'admin/create-new-product': '/api/products/insert',

	'admin/sale-info/id': (params) => '/api/sales_infos/getSaleInfoById' + `?sales_info_id=${params}`,
	'admin/update-sale': '/api/sales_infos/update',
	'admin/create-new-sale': '/api/sales_infos/insert',

	'admin/category': '/api/categorys/getAll',
}

export default axios.create({
	baseURL: 'http://127.0.0.1:9000/',
})