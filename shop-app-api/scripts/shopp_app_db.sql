--
use master;  
go  
if db_id (N'shop_app') is not null  
drop database shop_app;  
go  
create database shop_app  
collate vietnamese_100_cs_as_ks_ws_sc_utf8;  
go 

--	tài khoản người dùng
use shop_app; 
create table [dbo].[users](
	[user_id]				[int] not null identity(1,1) primary key,
	[username]				[nvarchar](50) not null,
	[password]				[nvarchar](max) not null,
	[name]					[nvarchar](50) not null,
	[date_ob]				[datetime] null,
	[gen]					[nvarchar](50) null,
	[phone]					[nvarchar](10) null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[status_acc]			[nvarchar](20 )default 'active' null,
	--status_acc:			forgot_password							-- người dùng gửi yêu cầu quên mật khẩu
	--						reset_password							-- admin phản hồi reset password và khóa tài khoản tạm thời -> validationflag = '0'
	--						active									-- tài khoảng dùng bình thường, hoặc người xác nhận thay đổi mật khẩu thành công -> validationflag = '1'
	[role_name]				[nvarchar](50) default 'register' null,
	--role_name:			admin
	--						manager
	--						register
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,
);

insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note)
--output inserted.*
values('admin','123456','nguyễn văn q', 1990-10-14, 'm', '1234567890', '1', 'active','admin', 2022-20-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('quanly1','123456','nguyễn văn a', 1991-10-14, 'm', '1234567890', '1', 'active', 'manager', 2022-21-03,'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('quanly2','123456','nguyễn văn b', 1992-10-14, 'f', '1234567890', '1', 'active', 'manager', 2022-22-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung1','123456','nguyễn văn c', 1993-10-14, 'm', '1234567890', '1', 'active', 'register', 2022-23-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung2','123456','nguyễn văn e', 1994-10-14, 'f', '1234567890', '1', 'active', 'register', 2022-23-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung3','123456','nguyễn văn f', 1995-10-14, 'f', '1234567890', '1', 'active', 'register', 2022-24-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung4','123456','nguyễn văn g', 1996-10-14, 'm', '1234567890', '1', 'active', 'register', 2022-25-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [users](username,password,name,date_ob,gen,phone,validationflag,status_acc,role_name,created_date,created_by,created_note,update_date,update_by,update_note) values('nguoidung5','123456','nguyễn văn h', 1997-10-14, 'm', '1234567890', '1', 'active', 'register', 2022-25-03, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');


-- token đăng nhập
create table [dbo].[token](
	[id]					[int] not null,
	[user_id]				[int] not null identity(1,1) primary key,
	[token]					[nvarchar](max) not null,

	CONSTRAINT FK_user_id FOREIGN KEY (user_id)		REFERENCES users(user_id),
);


-- hỗ trợ tìm kiếm theo loại sản phẩm
create table [dbo].[categorys](
	[category_id]			[int] not null identity(1,1) primary key,
	[name]					[nvarchar](50) null,
	[description]			[nvarchar](max) null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,
);

insert into [categorys](name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 1','các mặc hàng quần áo', '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [categorys](name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 2','các mặc hàng dày dép', '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [categorys](name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 3','các mặc ba lô', '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [categorys](name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 4','các mặc điện thoại', '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [categorys](name,description,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values('sản phẩm loại 5','các mặc hàng trong nhà', '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');


-- sản phẩm
create table [dbo].[products](
	[product_id]			[int] not null identity(1,1) primary key,
	[category_id]			[int] not null,
	[name]					[nvarchar](50) null,
	[description]			[nvarchar](max) null,
	[price]					[numeric] default 0 null,
	[stored_qty]			[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,

	CONSTRAINT FK_category_id FOREIGN KEY (category_id)			REFERENCES categorys(category_id),
);

insert into [products](category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'quần 1', 'trang phục công sở', 200, 123, '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [products](category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'áo 2', 'trang phục thể thao', 200, 123, '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [products](category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(1,'quần 3', 'trang phục ở nhà', 200, 123, '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [products](category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(2,'dép 1', 'dép lào', 200, 123, '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');
insert into [products](category_id,name,description,price,stored_qty,validationflag,created_date,created_by,created_note,update_date,update_by,update_note) values(2,'dép 2', 'dép tổ ong', 200, 123, '1', 2022-05-09, 'admin', 'create by sql', 2022-05-09,'admin', 'create by sql');


-- giảm giá theo loại sản phẩm
create table [dbo].[discount_codes](
	[discount_code_id]		[int] not null identity(1,1) primary key,
	[category_id]			[int] not null,
	[name]					[nvarchar](50) null,
	[used_time]				[datetime] null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,
	
	CONSTRAINT FK2_category_id FOREIGN KEY (category_id)		REFERENCES categorys(category_id),
);


-- thông tin bài viết
create table [dbo].[sales_infos](
	[sales_info_id]			[int] not null identity(1,1) primary key,
	[title]					[nvarchar](50) null,
	[content]				[nvarchar](max) null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,
);


create table [dbo].[sales_info_product](
	[sales_info_id]			[int] not null identity(1,1) primary key,
	[product_id]			[int] not null,
	[discount_code_id]		[nvarchar](50) null,
	[content]				[nvarchar](max) null,
	[qty]					[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,

	CONSTRAINT FK_sales_info_id	FOREIGN KEY (sales_info_id)		REFERENCES sales_infos(sales_info_id),
	CONSTRAINT FK_product_id	FOREIGN KEY (product_id)		REFERENCES products(product_id),
);


-- hóa đơn
create table [dbo].[orders](
	[order_id]				[int] not null identity(1,1) primary key,
	[user_id]				[int] not null,
	[total_qty]				[numeric] default 0 null,
	[total_price]			[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,

	CONSTRAINT FK2_user_id FOREIGN KEY (user_id)    		REFERENCES users(user_id),
);


create table [dbo].[order_detail](
	[order_id]				[int] not null identity(1,1) primary key,
	[product_id]			[int] not null,
	[qty]					[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,

	CONSTRAINT FK_order_id FOREIGN KEY (order_id)			REFERENCES orders(order_id),
	CONSTRAINT FK2_product_id FOREIGN KEY (product_id)		REFERENCES products(product_id),
);


-- thông tin hóa đơn nhập hàng
create table [dbo].[import_products](
	[import_product_id]		[int] not null identity(1,1) primary key,
	[total_qty]				[nvarchar](50) null,
	[total_price]			[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,
);


create table [dbo].[import_product_detail](
	[import_product_id]		[int] not null identity(1,1) primary key,
	[product_id]			[int] not null,
	[qty]					[nvarchar](50) null,
	[price_import]			[numeric] default 0 null,
	[validationflag]		[nvarchar] default '1' null,			-- '1' là còn sử dụng, '0' là ngưng sử dụng, có thể hiểu là active
	[created_date]			[datetime] null,
	[created_by]			[nvarchar](50) null,
	[created_note]			[nvarchar](50) null,
	[update_date]			[datetime] null,
	[update_by]				[nvarchar](50) null,
	[update_note]			[nvarchar](50) null,

	CONSTRAINT FK_import_product_id FOREIGN KEY (import_product_id)		REFERENCES import_products(import_product_id),
	CONSTRAINT FK3_product_id FOREIGN KEY (product_id)					REFERENCES products(product_id),
);