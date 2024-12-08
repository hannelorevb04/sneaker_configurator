const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/api/v1/products');


router.get('/', productController.getAll);


router.post('/', productController.create);

module.exports = router;
