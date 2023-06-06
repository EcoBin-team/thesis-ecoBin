const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feeds");

router.get("/feeds", feedController.getFeeds);
router.post("/feeds", feedController.createFeed);

module.exports = router;