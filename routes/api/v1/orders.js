const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/api/v1/orders');
const { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrderById } = require('../../../controllers/api/v1/orders');
const authenticateToken = require('../../../middleware/auth.js');


if (!orderController.getAllOrders || !orderController.createOrder) {
    throw new Error('Order controller functies zijn niet correct geïmporteerd');
}

router.get('/', authenticateToken, getAllOrders);
router.post('/', authenticateToken, createOrder);
router.get('/:orderId', authenticateToken, getOrderById);
router.put('/:orderId', authenticateToken, updateOrder);
router.delete('/:orderId', authenticateToken, deleteOrderById);

module.exports = router;
