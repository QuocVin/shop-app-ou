const { basicServ, saleServ } = require("../services");
const { createResponse } = require("./_helper");
const _ = require("lodash");

exports.getSaleInfoById = async (req, res) => {
    try {
        const ret = await saleServ.getSaleInfoById('categorys', req.query);

        return createResponse(res, ret);
    } catch (ex) {
        return createResponse(res, ex, false);
    }
};