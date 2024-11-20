
const express = require('express');
const router = express.Router();
const orderController = require('../../../controllers/api/v1/orders');

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.get("/:orderId", orderController.getById);
router.put("/:orderId", orderController.update);
router.delete("/:orderId", orderController.deleteById);

module.exports = router;
