import axios from 'axios';

export let endpoints = {
	'user': '/user/',
	'current-user': '/user/current-user/',
	'oauth2-info': '/oauth2-info/',
	'login': '/o/token/',
	'is-booking': 'is-booking/',

	'admin/product': (params, page) => '/api/products/getPageProducts' + `?page=${page || 1}` + params,
	'admin/product/id': (params) => '/api/products/detail' + `?product_id=${params}`,
	'admin/update-product': '/api/products/update',
	'admin/create-new-product': '/api/products/insert',

	'admin/category': '/api/categorys/getAll',
}

export default axios.create({
	baseURL: 'http://127.0.0.1:9000/',
})