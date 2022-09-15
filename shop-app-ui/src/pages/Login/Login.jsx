import React, { useState } from 'react';
import {
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
	Box,
} from '@material-ui/core';
import API, { endpoints } from '../../helpers/API';
import cookies from 'react-cookies';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from "./Login-styles";
import { setAuthLS, LS_KEY } from "../../helpers/localStorage";
import { formFields } from "./Login-const";
import { useForm } from "react-hook-form";
import {
	AppTable,
	AppInput,
	AppForm,
	AppSearch,
	AppAlert,
} from '../../components';
import { PublicRoutes } from '../../routes/public-route';
import { infoRequest } from '../../helpers/utils';
import { ProtectPaths } from '../../routes/protect-route';

export default function Login() {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const [openAlert, setOpenAlert] = React.useState(false);
	const [alertInfo, setAlertInfo] = React.useState(false);
	const { control, setValue, getValues } = useForm();

	const signInSucess = (role) => {
		setAuthLS(LS_KEY.AUTH_TOKEN, role);
	}

	const login = async (event) => {
		const formData = Object.assign({}, getValues())
		const formInfo = {
			formType: 'login',
			auth: 'admin',
			note: 'AdminSaleInfoDetail',
		}
		infoRequest(formData, formInfo);
		try {
			if (event) {
				event.preventDefault();
			}
			let res = await API.post(endpoints['login'],
				JSON.stringify(formData),
				{
					headers: {
						'Content-type': 'application/json; charset=UTF-8',
					},
				});
			if (res.data.error) {
				setAlertInfo({
					typeAlert: { warning: true },
					label: 'Sai thông tin đăng nhập!',
				})
				setOpenAlert(true);
			} else {
				cookies.save("access_token", res.data.result.auth.access_token)
				signInSucess(res.data.result.profile.role_name);
				console.info(res)
				cookies.save("user", res.data.result.profile.username);
				history.push(ProtectPaths.AdminProduct);
				// dispatch({
				// 	"type": "login",
				// 	"payload": res.data.result.profile
				// })
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

	// xử lý sự kiện đóng thông báo
	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenAlert(false);
			if (alertInfo.typeAlert.success) {
				window.location.reload();
			}
		}
	};

	return (
		<Container className={classes.Login}>
			<Box className='box-login'>
				<Box>
					<Typography variant="h4" className='title-logic'>{PublicRoutes.Login.label}</Typography>
				</Box>

				{/* tìm kiếm */}
				<AppForm
					fields={formFields()}
					control={control}
					onGoSubmit={login}
					formType={'login'}
				/>
			</Box>

			<AppAlert open={openAlert} handleClose={handleCloseAlert} typeAlert={alertInfo?.typeAlert} label={alertInfo?.label} />
		</Container>
	);
}