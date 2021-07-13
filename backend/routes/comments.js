const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/commentsCtrl');
const auth = require('../middleware/auth');

// ----------  COMMENTS ROUTES  ----------  //
router.post('/:id/comment', auth, commentsCtrl.createComment);
router.get('/:id/comment', auth, commentsCtrl.getAllComments);

module.exports = router;