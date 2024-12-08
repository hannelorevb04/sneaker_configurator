/*const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/users');
const authenticateToken = require('../../../middleware/auth');


router.get('/', authenticateToken, userController.getUser);

router.post('/create', userController.createUser);


router.post('/login', userController.login);


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

        
        console.log('Ontvangen plaintext:', plaintext);
        console.log('Ontvangen hash:', hashed);

        
        if (!plaintext || !hashed) {
            console.error('Lege plaintext of hash ontvangen');
            return res.status(400).json({
                status: 'Error',
                message: 'Plaintext and hashed values are required',
            });
        }

        
        const isMatch = await bcrypt.compare(plaintext, hashed);

       
        console.log('Vergelijking geslaagd:', isMatch);

       
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


router.post('/login', userController.login);


router.post('/create', (req, res, next) => {
    console.log('Create user route aangeroepen');
    next();
}, userController.createUser);


//wijzig wachtwoord
/*router.put('/update-password', authenticateToken, userController.updatePassword);*/

module.exports = router;
