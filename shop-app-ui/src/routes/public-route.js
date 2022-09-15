import HomeIcon from "@material-ui/icons/Home";

import PageLogin from "../pages/Login/Login";

const NEDRoutes = {
	New: "new",
	Detail: ":id"
}

// tên route cho từng view
export const PublicRouteNames = {
	Login: 'Login',
}

// đường dẫn chỉ đến view admin
export const PublicPaths = {
	Login: ['', PublicRouteNames.Login].join('/'),
}

// thông tin cần thiết để hiển thị 1 view admin
export const PublicRoutes = {
	Login: {
		exact: true,
		id: PublicRouteNames.Login,
		label: "Đăng nhập",
		path: PublicPaths.Login,
		component: PageLogin,
	},
}
