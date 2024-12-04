const User = require('../../../models/User');

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

// Controleer het wachtwoord
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Haal de admin op
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

        // Vergelijk het ingevoerde wachtwoord
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ status: 'Error', message: 'Invalid password' });
        }

        res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            data: { user }
        });
    } catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
};

module.exports = {
    getUser,
    createUser,
    login
};
