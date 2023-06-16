const{ getOneFeed, getAllFeeds,postComment ,getAllComments,postLike,deleteLike,getAllLikesByPostId} = require('../controllers/feeds');
const express = require('express');
const router = express.Router();
// GET one feed
router.get('/feeds/:id', getOneFeed);

// GET all feeds
router.get('/feeds', getAllFeeds);
// comment
router.post('/feeds/:id/postComment',postComment);
router.get('/feeds/:id/comments', getAllComments);
module.exports = router;