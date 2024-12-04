const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/users');

// GET: Haal de admin user op
router.get('/', userController.getUser);

// POST: Maak de admin user aan (eenmalig)
router.post('/create', userController.createUser);

// POST: Log in met de admin
router.post('/login', userController.login);

module.exports = router;
