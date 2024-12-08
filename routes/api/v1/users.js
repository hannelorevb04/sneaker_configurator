/*const express = require('express');
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

router.post('/test-bcrypt', async (req, res) => {
    try {
        const { plaintext, hashed } = req.body;

        const isMatch = await bcrypt.compare(plaintext, hashed);
        res.json({ isMatch });
    } catch (error) {
        console.error('Error in bcrypt test:', error);
        res.status(500).json({
            status: 'Error',
            message: 'An error occurred during bcrypt test',
        });
    }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/test-bcrypt', async (req, res) => {
    try {
        const { plaintext, hashed } = req.body;

        // Logging van de ontvangen waarden
        console.log('Ontvangen plaintext:', plaintext);
        console.log('Ontvangen hash:', hashed);

        // Controleer of beide waarden aanwezig zijn
        if (!plaintext || !hashed) {
            console.error('Lege plaintext of hash ontvangen');
            return res.status(400).json({
                status: 'Error',
                message: 'Plaintext and hashed values are required',
            });
        }

        // Vergelijk de waarden
        const isMatch = await bcrypt.compare(plaintext, hashed);

        // Logging van het resultaat
        console.log('Vergelijking geslaagd:', isMatch);

        // Retourneer het resultaat
        res.json({ isMatch });
    } catch (error) {
        console.error('Error in bcrypt test:', error.message);
        res.status(500).json({
            status: 'Error',
            message: 'An error occurred during bcrypt test',
        });
    }
});

module.exports = router; */


const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/users');
const authenticateToken = require('../../../middleware/auth');

// POST: Log in met de admin
router.post('/login', userController.login);

// POST: Maak de admin user aan (eenmalig)
router.post('/create', (req, res, next) => {
    console.log('Create user route aangeroepen');
    next();
}, userController.createUser);


// PUT: Wijzig het wachtwoord van de admin
/*router.put('/update-password', authenticateToken, userController.updatePassword);*/

module.exports = router;
