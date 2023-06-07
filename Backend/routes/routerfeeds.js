const { getOneFeed, getAllFeeds } = require('../controllers/feeds');
const router = require("express").Router()
// GET one feed
router.get('/feeds/:id', getOneFeed);

// GET all feeds
router.get('/feeds', getAllFeeds);

module.exports = router;