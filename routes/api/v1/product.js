const express = require('express');
const router = express.Router();
const productsController = require('../../../controllers/api/v1/products');

/* api/v1/product */
router.get("/", productsController.getAll);

router.post("/", productsController.create);

module.exports = router;