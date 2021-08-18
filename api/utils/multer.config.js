	
const multer = require('multer');
 
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
var uploadFiles=multer();
module.exports = {
    upload,
    uploadFiles
};