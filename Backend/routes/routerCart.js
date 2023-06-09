const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/users/:userId', cartController.addToCart);
router.delete('/users/:userId', cartController.removeFromCart);
router.get('/users/:userId', cartController.getAllCarts);

module.exports = router;
