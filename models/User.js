const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definieer het schema voor een gebruiker
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Naam van de admin
    email: { type: String, required: true, unique: true }, // Uniek e-mailadres
    password: { type: String, required: true }, // Gehashed wachtwoord
    orderIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] // Referentie naar orders
});

// Pre-save hook om wachtwoord te hashen
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Alleen hashen als het wachtwoord gewijzigd is
    }
    try {
        const salt = await bcrypt.genSalt(10); // Genereer een salt
        this.password = await bcrypt.hash(this.password, salt); // Hash het wachtwoord
        next();
    } catch (err) {
        next(err);
    }
});

// Methode om wachtwoord te verifiëren
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password); // Vergelijk wachtwoorden
};

// Hash wachtwoord voor opslaan
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Alleen hashen als het wachtwoord gewijzigd is
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Methode om wachtwoord te vergelijken
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const user = await User.findById(payload.userId);
    if (!user || user.tokenVersion !== payload.tokenVersion) {
        return res.status(403).json({ message: 'Token invalidated' });
    }
    req.user = user;
    next();
});


// Maak en exporteer het model
module.exports = mongoose.model('User', userSchema, 'Users');
