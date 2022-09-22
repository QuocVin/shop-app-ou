const _ = require("lodash");
const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const basicServ = require("./basic-serv");
const {
	QueryTypes,
	db,
	createResult,
} = require("../database/db-access");

exports.getOrderByUser = async (tableName, params) => {
	const sql = `
		SELECT	O.*,
				P.name						AS product_name,
				P.price,
				U.name
		FROM	orders O
				LEFT OUTER JOIN products P
					ON	P.product_id		= O.product_id
				LEFT OUTER JOIN users U
					ON	U.user_id			= O.user_id
		WHERE	O.user_id = ${params.user_id}
		ORDER BY O.update_date DESC
		`

	try {
		const ret = await db.query(sql, { type: QueryTypes.SELECT });
		return ret;
	} catch (ex) {
		return createResult(null, ex);
	}
};

exports.getSaleInfoList = async (tableName, params) => {
	const sql = `
		SELECT	S.sales_info_id,
		        S.product_id,
				S.title,
				S.content,
				P.name				AS product_name,
				P.price,
				S.validationflag,
				S.update_note,
				S.update_date,
				S.created_date
		FROM	sales_infos S
				LEFT OUTER JOIN products P
					ON	P.product_id = S.product_id
		WHERE	S.title like '%${params.title || ''}%'
		ORDER BY S.update_date desc, S.title
		`;
	try {
		const ret = await db.query(sql, { type: QueryTypes.SELECT });
		return ret;
	} catch (ex) {
		return createResult(null, ex);
	}
};