const _ = require("lodash");
const { basicAcs } = require("../database");
const { bcryptUtil } = require("../utils");
const basicServ = require("./basic-serv");
const {
	QueryTypes,
	db,
	createResult,
} = require("../database/db-access");

exports.getSaleInfoById = async (tableName, params) => {
	console.info('-------------params', params)

	const sql = `
		SELECT	S.product_id,
				S.title,
				S.content,
				P.name				AS product_name,
				P.price,
				P.stored_qty
		FROM	sales_infos S
				LEFT OUTER JOIN products P
					ON	P.product_id = S.product_id
		WHERE	sales_info_id = ${params.sales_info_id}
		`

	try {
		const ret = await db.query(sql, { type: QueryTypes.SELECT });
		console.info('-------------ret', ret[0])
		return ret[0];
	} catch (ex) {
		return createResult(null, ex);
	}
};