const express = require('express');
const router = express.Router();
const likesCtrl = require('../controllers/likesCtrl');

// ----------  LIKES ROUTES  ----------  //
router.post('/:id/vote/like', likesCtrl.likePost);
router.post('/:id/vote/dislike', likesCtrl.dislikePost);

module.exports = router;