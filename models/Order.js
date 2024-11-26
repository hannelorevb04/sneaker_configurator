const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // Naam van de klant
    quantity: { type: Number, required: true }, // Aantal items
    address: { type: String, required: true }, // Leveradres
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }, // Status van de bestelling
    total: { type: Number, required: true } // Totale prijs van de bestelling
});

module.exports = mongoose.model('Order', orderSchema, 'Orders');
