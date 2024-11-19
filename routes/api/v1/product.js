const express = require('express');
const router = express.Router();

/* api/v1/product */
router.get("/", ordersController.getAll);

router.post("/", ordersController.create);

module.exports = router;