const mongoose = require('mongoose');

const SneakerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    shoeSize: { type: Number },
    shoeColor: { type: String },
    shoelaceColor: { type: String },
    price: { type: Number },
    availability: { type: Boolean, default: true },
    quantity: { type: Number }
});

module.exports = mongoose.model('Sneaker', SneakerSchema);
