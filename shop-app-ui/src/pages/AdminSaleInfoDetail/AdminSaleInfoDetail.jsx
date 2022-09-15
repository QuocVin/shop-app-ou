import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
	Grid,
	Typography,
	Container,
	Button,
	TextField,
	Box,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import { infoRequest } from '../../helpers/utils';
import { useStyles } from './AdminSaleInfoDetail-styles';
import { useHistory, useLocation } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import { ProtectRoutes } from '../../routes/protect-route';
import {
	AppTable,
	AppInput,
	AppForm,
	AppSearch,
	AppAlert,
} from '../../components';
import { useForm, Controller } from "react-hook-form";
import { productKey, formFields } from "./AdminSaleInfoDetail-const";
import { AdminProductColumns } from "./AdminSaleInfoDetail-const"

export default function AdminSaleInfoDetail() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false)
	const [productList, setProductList] = useState([]);
	const [productInfo, setProductInfo] = useState({});
	const [btnValue, setBtnValue] = useState('Tìm sản phẩm');
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const [formType, setFormType] = useState('')

	const viewPath = useLocation().pathname.split('/');
	const productId = viewPath[viewPath.length - 1]
	const { control, setValue, getValues } = useForm();

	// liên quan đến lifecycle của reactjs, được gọi khi component có sự thay đổi
	// chỉ gọi 1 lần duy nhất
	useEffect(() => {
		// const productId = viewPath[viewPath.length - 1]
		async function init() {
			// setLoading(true)
			if (productId === 'new') {
				setFormType('insert')
			} else {
				setFormType('update')
			}
			fetchProducts();
		}
		init();
	}, [])

	// // chỉ gọi khi products thay đổi
	// useEffect(() => {
	// 	getDataToForm();
	// }, [products])

	// // lấy thông tin bài viết từ data truyền vào form
	// const getDataToForm = () => {
	// 	productKey.map((p) => setValue(p, products[p]))
	// }

	// lấy danh sách product
	const fetchProducts = async (params = '') => {
		let page = 2;
		const _path = endpoints['admin/product'](params)
		// const _path = endpoints['admin/product'](params, page)
		API.get(_path).then(res => {
			setProductList(res.data.result.rows);
		})
	}

	// update thông tin bài viết
	const updateInfoProduct = async (event) => {
		const formData = Object.assign({}, getValues())
		const formInfo = {
			formType: formType,
			auth: 'admin',
			note: 'AdminSaleInfoDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.put(endpoints['admin/update-product'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại thông tin!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Cập nhật thông tin bài viết thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}
		} catch (err) {
			console.log("ERROR:\n", err);
			setOpenAlert(true);
			setAlertInfo({
				typeAlert: { error: true },
				label: 'Lỗi hệ thống, bạn vui lòng kiểm tra lại kết nối!'
			})
		}
	}

	// tạo mới bài viết
	const createNewProduct = async (event) => {
		const formData = Object.assign({}, getValues());
		const formInfo = {
			formType: formType,
			auth: 'admin',
			note: 'AdminProductNew',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['admin/create-new-product'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			console.info("res:", res)
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Lỗi, bạn vui lòng kiểm tra lại thông tin!',
				})
				setOpenAlert(true);
			} else {
				setAlertInfo({
					typeAlert: { success: true },
					label: 'Tạo mới bài viết thành công!!!'
				})
				setOpenAlert(true);
				setTimeout(() => {
					history.push(ProtectRoutes.AdminProduct.path);
				}, 1500);
			}
		} catch (err) {
			console.log("ERROR:\n", err);
			setOpenAlert(true);
			setAlertInfo({
				typeAlert: { error: true },
				label: 'Lỗi hệ thống, bạn vui lòng kiểm tra lại kết nối!'
			})
		}
	}

	// chọn button quay về
	const handleGoBack = () => {
		// history.push(ProtectRoutes.AdminProduct.path);
		console.info(getValues())
	};

	// xử lý sự kiện đóng thông báo, cật nhật thành công thì reload trang sau khi đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	let elmArr = [];
	const handleChooseProduct = (rowData, elementId) => {
		if (elmArr.length > 0) {
			elmArr.map((e) => e.classList.remove('row-act'))
			elmArr = [];
		}
		let docTemp = document.getElementById(elementId);
		docTemp.classList.add('row-act');
		elmArr.push(docTemp);
		setValue('product_id', rowData.product_id);
		setValue('title', rowData.name);
		setValue('price', rowData.price);
		setValue('stored_qty', rowData.stored_qty);
		setProductInfo(rowData)
	};

	const handleChooseProduct2 = () => {
		if (btnValue === 'Tìm sản phẩm') {
			setBtnValue('Xác nhận')
		}
		if (btnValue === 'Xác nhận') {
			setBtnValue('1')
			// setValue('product_id', productInfo.product_id)
		}
	};

	return (
		<Container className={classes.AdminSaleInfoDetail}>
			<Box className='box-title'>
				{productId === 'new' ? <Typography variant="h4" className='title-product'>Bài viết mới </Typography>
					: <Typography variant="h4" className='title-product'>{ProtectRoutes.AdminSaleInfoDetail.label}: {1}</Typography>}
				{btnValue !== '1' && (
					<Button className='btn-search' id="btnChoose" onClick={handleChooseProduct2}>{btnValue}</Button>
				)}
			</Box>

			{(btnValue !== '1' && btnValue !== 'Tìm sản phẩm') && (
				<Box>
					<AppTable columns={AdminProductColumns} data={productList} isBtn={false} handleChooseItem={handleChooseProduct} />
				</Box>
			)}


			{/* form */}
			<AppForm
				fields={formFields()}
				// fields={formFields(categorys, products)}
				control={control}
				onGoBack={handleGoBack}
				onGoSubmit={formType === 'insert' ? createNewProduct : updateInfoProduct}
				formType={formType}
			/>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}
