import DashboardPage from "../pages/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from '@material-ui/icons/People';

import PageAdminProduct from "../pages/AdminProduct";
import PageAdminProductDetail from "../pages/AdminProductDetail";

// import PageAdminSaleInfo from "../pages/AdminSaleInfo";
import PageAdminSaleInfoDetail from "../pages/AdminSaleInfoDetail";

// import PageAdminProduct__ from "../pages/AdminProduct__";
// import PageAdminProductDetail__ from "../pages/AdminProductDetail__";
// import PageAdminProductNews__ from "../pages/AdminProductNews__";



const NEDRoutes = {
	New: "new",
	Detail: ":id"
}

// tên route cho từng view admin
export const ProtectRouteNames = {
	Dashboard: 'Admin',
	Customer: 'Customer',
	CustomerNew: 'CustomerNew',
	CustomerDetail: 'CustomerDetail',

	AdminProduct: 'AdminProduct',
	AdminProductDetail: 'AdminProductDetail',
	AdminProductNews: 'AdminProductNews',

	AdminSaleInfo: 'AdminSaleInfo',
	AdminSaleInfoDetail: 'AdminSaleInfoDetail',
	AdminSaleInfoNews: 'AdminSaleInfoNews',

	AdminProduct__: 'AdminProduct__',
	AdminProductDetail__: 'AdminProductDetail__',
	AdminProductNews__: 'AdminProductNews__',
}

// đường dẫn chỉ đến view admin
export const ProtectPaths = {
	Dashboard: ['', ProtectRouteNames.Dashboard].join('/'),

	AdminProduct: ['/Admin', ProtectRouteNames.AdminProduct].join('/'),
	AdminProductDetail: ['/Admin', ProtectRouteNames.AdminProductDetail, NEDRoutes.Detail].join('/'),
	AdminProductNews: ['/Admin', ProtectRouteNames.AdminProductNews, NEDRoutes.New].join('/'),

	AdminProduct__: ['/Admin', ProtectRouteNames.AdminProduct__].join('/'),
	AdminProductDetail__: ['/Admin', ProtectRouteNames.AdminProductDetail__, NEDRoutes.Detail].join('/'),
	AdminProductNews__: ['/Admin', ProtectRouteNames.AdminProductNews__, NEDRoutes.New].join('/'),
}

// thông tin cần thiết để hiển thị 1 view admin
export const ProtectRoutes = {
	Dashboard: {
		exact: true,
		id: ProtectRouteNames.Dashboard,
		label: "Trang quản trị",
		path: ProtectPaths.Dashboard,
		component: DashboardPage,
		icon: HomeIcon
	},
	// routes product view admin
	AdminProduct: {
		exact: true,
		id: ProtectRouteNames.AdminProduct,
		label: "Quản lý sản phẩm",
		path: ProtectPaths.AdminProduct,
		component: PageAdminProduct,
		icon: HomeIcon
	},
	AdminProductDetail: {
		exact: true,
		id: ProtectRouteNames.AdminProductDetail,
		label: "Thông tin sản phẩm",
		path: ProtectPaths.AdminProductDetail,
		component: PageAdminProductDetail,
		icon: HomeIcon
	},
	AdminProductNews: {
		exact: true,
		id: ProtectRouteNames.AdminProductNews,
		label: "Tạo mới sản phẩm",
		path: ProtectPaths.AdminProductNews,
		component: PageAdminProductDetail,
		icon: HomeIcon
	},
	// routes saleInfo view admin
	// AdminSaleInfo: {
	// 	exact: true,
	// 	id: ProtectRouteNames.AdminSaleInfo,
	// 	label: "Quản lý bài viết",
	// 	path: ProtectPaths.AdminSaleInfo,
	// 	component: PageAdminSaleInfo,
	// 	icon: HomeIcon
	// },
	AdminSaleInfoDetail: {
		exact: true,
		id: ProtectRouteNames.AdminSaleInfoDetail,
		label: "Thông tin bài viết",
		path: ProtectPaths.AdminSaleInfoDetail,
		component: PageAdminSaleInfoDetail,
		icon: HomeIcon
	},
	AdminSaleInfoNews: {
		exact: true,
		id: ProtectRouteNames.AdminSaleInfoNews,
		label: "Tạo mới bài viết",
		path: ProtectPaths.AdminSaleInfoNews,
		component: PageAdminSaleInfoDetail,
		icon: HomeIcon
	},
}
