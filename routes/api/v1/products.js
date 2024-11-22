const express = require('express');
const router = express.Router();
const productController = require('../../../controllers/api/v1/products');

// GET: Haal alle producten op
router.get('/', productController.getAll);

// POST: Voeg een nieuw product toe
router.post('/', productController.create);

module.exports = router;
