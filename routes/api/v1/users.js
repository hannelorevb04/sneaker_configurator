const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/users');
const authenticateToken = require('../../../middleware/auth');

// GET: Haal de admin user op
router.get('/', authenticateToken, userController.getUser);

// POST: Maak de admin user aan (eenmalig)
router.post('/create', userController.createUser);

// POST: Log in met de admin
router.post('/login', userController.login);

// PUT: Wijzig het wachtwoord van de admin
router.put('/update-password', authenticateToken, userController.updatePassword);

module.exports = router;

