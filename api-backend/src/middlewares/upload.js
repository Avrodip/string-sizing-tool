/**
 * Common file upload middlewre.
 */

const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
var fs = require("fs");
const tempFileLocation =
    process.env.FILE_LOCATION + process.env.TEMP_FILE_LOCATION;
//const mv = require('mv');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var dir = __basedir + tempFileLocation;
        //console.log(dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        //console.log(file.originalname);
        //console.log(__basedir);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
