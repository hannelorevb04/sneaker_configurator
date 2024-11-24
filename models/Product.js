// models/Product.js
const mongoose = require('mongoose');

// Definieer het schema voor een product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    shoeSize: { type: Number, required: true },
    shoeColor: { type: String, required: true },
    shoelaceColor: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    quantity: { type: Number, required: true }
});

// Maak en exporteer het model

module.exports = mongoose.model('Product', productSchema, 'Sneakers');
