const express = require('express');
const router = express.Router();
const ordersController = require('../../../controllers/api/v1/orders');

/* api/v1/orders */
router.get("/", ordersController.getAll);
router.post("/", ordersController.create);
router.get("/:id", ordersController.getById);
router.put("/:id", ordersController.update);
router.post("/:id", ordersController.deleteById);







module.exports = router;