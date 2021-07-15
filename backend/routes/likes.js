const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likesCtrl');

// ----------  LIKES ROUTES  ----------  //
router.post('/:postId/vote/like', likesCtrl.likePost);
router.post('/:postId/vote/dislike', likesCtrl.dislikePost);

module.exports = router;