var multer = require("multer")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}` )
    }
})

var fileFilter = (req, file, cb) => {
    var isAccepted = ['image/png', 'image/jpg', 'image/jpeg']
    .find(acceptedFormat => acceptedFormat == file.mimetype)

    if(isAccepted) {
        return cb(null, true);
    }

    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})