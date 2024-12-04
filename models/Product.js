const mongoose = require('mongoose');

// Definieer het schema voor een product
const productSchema = new mongoose.Schema({
    model: { type: String, required: true }, // Model van de schoen
    startPrice: { type: Number, required: true }, // Basisprijs
    size: { type: Number, required: true }, // Maat van de schoen
    colors: {
        sole: { type: String, required: true }, // Kleur van de zool
        laces: { type: String, required: true }, // Kleur van de veters
        outside_1: { type: String, required: true }, // Kleur buitenkant deel 1
        outside_2: { type: String, required: true } // Kleur buitenkant deel 2
    },
    materials: {
        sole: { type: String, required: true }, // Materiaal van de zool
        laces: { type: String, required: true }, // Materiaal van de veters
        outside_1: { type: String, required: true }, // Materiaal buitenkant deel 1
        outside_2: { type: String, required: true } // Materiaal buitenkant deel 2
    }
});

// Maak en exporteer het model
module.exports = mongoose.model('Product', productSchema, 'Products');
