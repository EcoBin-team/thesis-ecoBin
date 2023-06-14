const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/users/:userId', cartController.addToCart);
router.delete('/users/:userId', cartController.removeFromCart);
router.get('/users/:userId', cartController.getAllCarts);
router.get('/users/:userId/cart', cartController.getCartProducts);
router.get('/getall',cartController.getAllProducts)
router.post('/users/:userId/purchase', cartController.confirmPurchase);
router.get('/balance/:userId',cartController.getUserBalance)
module.exports = router;
