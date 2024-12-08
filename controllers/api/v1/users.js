const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken'); // Voeg JWT toe als import

// Haal de admin user op
const getUser = async (req, res) => {
    try {
        const user = await User.findOne(); // Haal de enige admin user op
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }
        res.status(200).json({
            status: 'Success',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

// Maak de admin user aan (éénmalig)
const createUser = async (req, res) => {
    try {
        // Controleer of er al een admin bestaat
        const existingUser = await User.findOne();
        if (existingUser) {
            return res.status(400).json({ status: 'Error', message: 'Admin user already exists' });
        }

        // Maak de admin user aan
        const { name, email, password } = req.body;

        if (email !== 'admin@admin.com' || password !== 'Admin') {
            return res.status(400).json({
                status: 'Error',
                message: 'Email must be admin@admin.com and password must be Admin'
            });
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({
            status: 'Success',
            data: { user: newUser }
        });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Haal de gebruiker op met het ingevoerde e-mailadres
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

        // Controleer of het wachtwoord klopt
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ status: 'Error', message: 'Invalid password' });
        }

        // Genereer een JWT-token
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Data in de payload
            process.env.JWT_SECRET, // Geheime sleutel uit je .env-bestand
            { expiresIn: '1h' } // Token verloopt na 1 uur
        );

        // Stuur de response terug met de token
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: { token }
        });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

// Wijzig het wachtwoord van de admin
const updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        // Controleer of beide wachtwoorden aanwezig zijn
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                status: 'Error',
                message: 'Both old and new passwords are required',
            });
        }

        // Haal de gebruiker op
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({
                status: 'Error',
                message: 'User not found',
            });
        }

        // Controleer of het ingevoerde oude wachtwoord klopt
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                status: 'Error',
                message: 'Old password is incorrect',
            });
        }

        // Hash het nieuwe wachtwoord
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update het wachtwoord en sla het op
        user.password = hashedPassword;
        await user.save();

        // Genereer een nieuwe JWT-token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            status: 'Success',
            message: 'Password updated successfully',
            token: token, // Retourneer de nieuwe token
        });


        res.status(200).json({
            status: 'Success',
            message: 'Password updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            message: 'An error occurred while updating the password',
        });
    }
};




module.exports = {
    getUser,
    createUser,
    login, 
    updatePassword
};
