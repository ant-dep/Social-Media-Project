const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/.gif': 'gif'
};
// Delimit files size
const maxSize = 1 * 20000 * 20000;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },

    filename: (req, file, callback) => {
        // replace spaces by _ in the filename
        const name = file.originalname.split(' ').join('_');
        // add extension
        const extension = MIME_TYPES[file.mimetype];
        // add timestamp for a unique filename
        callback(null, name + Date.now() + '.' + extension);
    },
    limits: { fileSize: maxSize }
});
// Save the file
module.exports = multer({ storage: storage }).single('image');