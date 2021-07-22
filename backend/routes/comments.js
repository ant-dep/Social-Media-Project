const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/commentsCtrl');

// ----------  COMMENTS ROUTES  ----------  //
router.post('/:id/comment', commentsCtrl.createComment);
router.get('/comment', commentsCtrl.getAllComments);

module.exports = router;