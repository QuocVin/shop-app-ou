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
import { useStyles } from './AdminUserManagement-styles';
import { useHistory } from 'react-router';
import {
	AppTable,
	AppSearch
} from '../../components';
import { ProtectRoutes } from '../../routes/protect-route';
import { AdminUserManagementColumns, formSearch } from "./AdminUserManagement-const"
import moment from "moment";
import { useForm, Controller } from "react-hook-form";

export default function AdminUserManagement() {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [userRole, setUserRole] = useState('register');
	const [userList, setUserList] = useState([]);
	const { control, setValue, getValues } = useForm();

	useEffect(() => {
		async function init() {
			await fetchUsers(`&role_name=${userRole}`);
		}
		init();
	}, [])

	// lấy danh sách product
	const fetchUsers = async (params = '') => {
		let page = 2;
		const _path = endpoints['admin/user'](params)
		// const _path = endpoints['admin/product'](params, page)
		API.get(_path).then(res => {
			setUserList(res.data.result.rows);
			setLoading(false)
		})
	}

	const handleSearch = async () => {
		let tempSearch = Object.assign({}, getValues())
		let tempKeys = Object.keys(tempSearch)
		let strSearch = '&' + tempKeys.map((s) => s + '=' + tempSearch[`${s}`] + '').join('&')
		await fetchUsers(strSearch)
	};

	const paramToDetail = {
		keyId: 'user_id',
		_path: 'AdminUserManagementDetail'
	}

	// chọn nút tạo mới
	const handleCreateNew = () => {
		history.push(ProtectRoutes.AdminUserManagementNews.path);
	};

	const handleSearchUserByRole = async (role) => {
		setUserRole(role);
		await fetchUsers(`&role_name=${role}`)
	}

	return (
		<Box className={classes.AdminUserManagement}>
			<Box>
				<Typography variant="h2">{userRole === 'manager' ? 'Quản lý nhân viên' : 'Quản lý người dùng'}</Typography>
			</Box>
			<Box className='box-table'>
				<Box className='box-search'>
					<Button className='btn-role' onClick={() => handleSearchUserByRole('manager')}>Nhân viên</Button>
					<Button className='btn-role' onClick={() => handleSearchUserByRole('register')}>Người dùng</Button>
					<Box className='app-search'>
						<AppSearch fields={formSearch} control={control} onSearch={() => { handleSearch() }} onCreateNew={() => { handleCreateNew() }} />
					</Box>
				</Box>

				{/* danh sách người dùng */}
				{loading ? <p>Loading ...</p> :
					<AppTable columns={AdminUserManagementColumns} data={userList} paramsChoose={paramToDetail} />
				}
			</Box>


		</Box>
	);
}
