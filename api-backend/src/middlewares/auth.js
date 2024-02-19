const jwt = require("jsonwebtoken");
const cacheUtil = require("../utils/cache");
const apiResponse = require("../helpers/apiResponse");
const commonFunction = require("../helpers/utility.js");
const config = process.env;

const verifyToken = async (req, res, next) => {
    //console.log(req.body);
    let token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    req.body.deviceType = req.headers["device-type"];
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    if (!token) {
        return apiResponse.forbiddenRequest(
            res,
            "A token is required for authentication."
        );
    }
    try {
        /* ---------------------- Check For Blacklisted Tokens ---------------------- */
        const isBlackListed = await cacheUtil.get(token);
        if (isBlackListed) {
            return apiResponse.unauthorizedResponse(res, "Unauthorized.");
        }
        const decoded = jwt.verify(
            commonFunction.decryptData(token),
            config.JWT_SECRET
        );
        req.user = decoded;
        //console.log(req.user);
    } catch (err) {
        return apiResponse.unauthorizedResponse(res, "Invalid Token.");
    }
    return next();
};

module.exports = verifyToken;
