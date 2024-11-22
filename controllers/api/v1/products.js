// controllers/api/v1/products.js
const Product = require('../../../models/Product'); // Importeer het Mongoose Product model

// Haalt alle producten op
const getAll = async (req, res) => {
    try {
        const products = await Product.find(); // Haal alle producten uit de database
        res.json({
            status: "Success",
            data: { products }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

// Maakt een nieuw product aan
const create = async (req, res) => {
    try {
        const { name, description, shoeSize, shoeColor, shoelaceColor, price, availability, quantity } = req.body;

        // Maak een nieuw product aan
        const newProduct = new Product({
            name,
            description,
            shoeSize,
            shoeColor,
            shoelaceColor,
            price,
            availability,
            quantity
        });

        // Sla het product op in de database
        await newProduct.save();

        res.json({
            status: "Success",
            data: { product: newProduct }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

module.exports = {
    getAll,
    create
}
