const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/postsCtrl');

// ----------  POSTS ROUTES  ----------  //
router.post('/new', multer, postsCtrl.createPost);
router.get('/', postsCtrl.findAll);
router.put('/:id', multer, postsCtrl.modifyPost);
router.delete('/:id', postsCtrl.deletePost);

module.exports = router;