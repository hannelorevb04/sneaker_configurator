const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/api/v1/orders');

// Controleer of de functies correct zijn geïmporteerd
if (!orderController.getAllOrders || !orderController.createOrder) {
    throw new Error('Order controller functies zijn niet correct geïmporteerd');
}

// Routes voor orders
router.get('/', orderController.getAllOrders); // Haal alle orders op
router.post('/', orderController.createOrder); // Maak een nieuwe order aan
router.get('/:orderId', orderController.getOrderById); // Haal een specifieke order op
router.put('/:orderId', orderController.updateOrder); // Update een bestaande order
router.delete('/:orderId', orderController.deleteOrderById); // Verwijder een order

module.exports = router;
