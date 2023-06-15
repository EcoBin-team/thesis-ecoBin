const { getOneFeed, getAllFeeds,postComment ,getAllComments,postLike,deleteLike,getAllLikesByPostId,updateLikes} = require('../controllers/feeds');
const express = require('express');
const router = express.Router();
// GET one feed
router.get('/feeds/:id', getOneFeed);

// GET all feeds
router.get('/feeds', getAllFeeds);
// comment
router.post('/feeds/:id/postComment',postComment);
router.get('/feeds/:id/comments', getAllComments);
// like
router.post('/feeds/:id/postLike', postLike);
router.put('/feeds/:id/likes', updateLikes);

router.delete('/likes/:postId/:userId', deleteLike);
router.get('/likes/post/:postId', getAllLikesByPostId);
module.exports = router;
