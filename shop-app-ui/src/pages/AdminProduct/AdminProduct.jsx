import React, { useEffect, useState } from 'react';
import {
	Box,
	Typography,
	Container,
	Button,
	TextField,
	Grid,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { useStyles } from './AdminProduct-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { AdminProductColumns } from "./AdminProduct-const"
import moment from "moment";
import { useForm, Controller } from "react-hook-form";

const PHAN_LOAI = [
	{ id: 'all', name: '-- Tất cả --' },
	{ id: '0', name: '0' },
	{ id: '1', name: '1' },
	{ id: '2', name: '2' },
	{ id: '3', name: '3' },
	{ id: '7', name: '7' },
	{ id: '9', name: '9' },
]

const fields2 = [
	{ id: 'name', label: 'Tên sản phẩm', xs: 3, component: { textField: true } },
	// { id: 'category_id', label: 'Phân loại sản phẩm', xs: 4, component: { selectBox: true }, items: PHAN_LOAI },
]

const fields = [
	{ id: 'name', label: { title: 'Tên sản phẩm' }, xs: 12, component: { textField: true } },
	{ id: 'price', label: { title: 'Số lượng trong kho' }, xs: 3, component: { textField: true } },
	{ id: 'stored_qty', label: { title: 'option 2' }, xs: 4, component: { textField: true } },
	{ id: 'category_id', label: { title: '', checkboxLabel: 'checkbox label option 3' }, xs: 12, component: { checkbox: true } },
	{ id: 'description', label: { title: 'option 4' }, xs: 12, component: { textField: true } },
	{ id: 'option5', label: { title: 'option 5' }, xs: 12, component: { radio: true } },
	{ id: 'option6', label: { title: 'option 6', checkboxLabel: 'checkbox label option 6' }, xs: 12, component: { checkbox: true } },
	{ id: 'option7', label: { title: 'option 7', checkboxLabel: 'checkbox label option 7' }, xs: 12, component: { checkbox: true } },
]

export default function AdminProduct() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');

	const [productList, setProductList] = useState([]);
	const { control, setValue, getValues } = useForm();

	useEffect(() => {
		async function init() {
			await fetchProducts();
			// await fetchCategorys();
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchProducts = async (params = '') => {
		let page = 2;
		setLoading(true)
		setTimeout(() => {
			const _path = endpoints['admin/product'](params)
			// const _path = endpoints['admin/product'](params, page)
			API.get(_path).then(res => {
				setProductList(res.data.result.rows);
				setLoading(false)
			})
		}, 500);
	}

	const handleSearch = () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		fetchProducts(strSearch)
	};

	const paramToDetail = {
		keyId: 'product_id',
		_path: 'AdminProductDetail'
	}

	// chọn nút tạo mới
	const handleCreateNew = () => {
		history.push(ProtectRoutes.AdminProductNews.path);
	};

	return (
		<Box className={classes.AdminProduct}>
			<Box>
				<Typography variant="h2">{ProtectRoutes.AdminProduct.label}</Typography>
			</Box>
			<Box className='box-table'>
				{/* <Grid container spacing={3}>
					<Grid item xs={9}>
						<AppInput />
						asd
					</Grid>
					<Grid item xs={3}>asd</Grid>
				</Grid> */}
				{/* <AppForm fields={fields} control={control} getValues={getValues} setValue={setValue} /> */}
				<AppSearch fields={fields2} control={control} onSearch={() => { handleSearch() }} onCreateNew={() => { handleCreateNew() }} />

				{/* danh sách sản phẩm */}
				{loading ? <p>Loading ...</p> :
					<AppTable columns={AdminProductColumns} data={productList} actHandleChoose={paramToDetail} />
				}
			</Box>


		</Box>
	);
}
