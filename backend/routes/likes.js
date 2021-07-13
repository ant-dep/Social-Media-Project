const express = require('express');
const router = express.Router();

const likesCtrl = require('../controllers/likesCtrl');
const auth = require('../middleware/auth');

// ----------  LIKES ROUTES  ----------  //
router.post('/:postId/vote/like', auth, likesCtrl.likePost);
router.post('/:postId/vote/dislike', auth, likesCtrl.dislikePost);

module.exports = router;