const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
    model: { type: String, required: true }, 
    startPrice: { type: Number, required: true },
    size: { type: Number, required: true }, 
    colors: {
        sole: { type: String, required: true }, 
        laces: { type: String, required: true },
        outside_1: { type: String, required: true }, 
        outside_2: { type: String, required: true } 
    },
    materials: {
        sole: { type: String, required: true }, 
        laces: { type: String, required: true },
        outside_1: { type: String, required: true },
        outside_2: { type: String, required: true } 
    }
});


module.exports = mongoose.model('Product', productSchema, 'Products');
