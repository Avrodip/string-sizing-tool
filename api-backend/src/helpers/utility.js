/**
 * File this containts all comment functions.
 */

const mv = require("mv");
const crypto = require("crypto");
const config = process.env;

/**
 * Function for generate rendom number.
 * @param {number}      length
 * @returns {number}
 */
exports.randomNumber = function (length) {
    var text = "";
    var possible = "123456789";
    for (var i = 0; i < length; i++) {
        var sup = Math.floor(Math.random() * possible.length);
        text += i > 0 && sup == i ? "0" : possible.charAt(sup);
    }
    return Number(text);
};

/**
 * Function for generate token.
 *
 * @returns {String}
 */
exports.generatePasswordToken = function () {
    var length = 10,
        charset =
            "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return String(password);
};

/**
 * Function for Move file.
 *
 * @returns {String}
 */
exports.moveFile = function (sourcePath, destinationPath) {
    mv(sourcePath, destinationPath, function (err) {
        if (err) {
            return err;
        } else {
            return "";
        }
    });
};

/**
 * Function for get project category name.
 *
 * @returns {String}
 */
exports.getProjectCategoryName = function (categoryID) {
    let result;
    switch (categoryID) {
        case 1:
            result = "Residential";
            break;
        case 2:
            result = "Industrial";
            break;
        case 3:
            result = "Commercial";
            break;
        case 4:
            result = "Government";
            break;
        case 5:
            result = "OpenSpace";
            break;
        default:
            result = "Residential";
            break;
    }
    return result;
};

/**
 * Function for get project type name.
 *
 * @returns {String}
 */
exports.getProjectTypeName = function (typeID) {
    let result;
    switch (typeID) {
        case 1:
            result = "FlatRCC";
            break;
        case 2:
            result = "TiltRoof";
            break;
        case 3:
            result = "SheetMetal";
            break;
        case 4:
            result = "Other";
            break;
        default:
            result = "FlatRCC";
            break;
    }
    return result;
};

/**
 * Function for get pagination object.
 *
 * @returns {Object}
 */
exports.getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: records } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, records, totalPages, currentPage };
};

/**
 * Function for get pagination.
 *
 * @returns {Object}
 */
exports.getPagination = (totalRecords, pageSize, page) => {
    var pageCount = 0;
    var start = 0,
        currentPage = 1;
    pageCount = Math.ceil(totalRecords / pageSize);
    if (typeof page !== "undefined") {
        currentPage = page;
    }
    if (currentPage > 1) {
        start = (currentPage - 1) * pageSize;
    }
    return { totalRecords, currentPage, pageSize, pageCount, start };
};

// Function to generate a random encryption key (32 bytes for AES-256)
exports.generateRandomKey = () => {
    return crypto.randomBytes(32);
};

// Function to encrypt JWT token data
exports.encryptData = (data) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher("aes-256-cbc", config.JWT_SECRET, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    //console.log(encryptedData)
    return encryptedData;
};

// Function to decrypt jwt token data
exports.decryptData = (encryptedData) => {
    const iv = crypto.randomBytes(16);
    const decipher = crypto.createDecipher("aes-256-cbc", config.JWT_SECRET, iv);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf-8");
    return decryptedData;
};

// Function to log errors to a file
// exports.logError = (errorMsg) => {
// 	fs.appendFile('error.log', errorMsg + '\n', (err) => {
// 		if (err) {
// 			console.error('Error writing to error log file: ' + err);
// 		}
// 	});
// }
