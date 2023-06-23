const express = require('express');
const router = express.Router();
const { getFAQs, getGuides } = require('../controllers/helpsController');

// GET FAQs
router.get('/faqs', getFAQs);

// GET Guides
router.get('/guides', getGuides);

module.exports = router;
