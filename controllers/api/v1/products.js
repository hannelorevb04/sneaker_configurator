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
};

// Maakt een nieuw product aan
const create = async (req, res) => {
    try {
        const {
            model,
            startPrice,
            size,
            colors,
            materials
        } = req.body;

        // Maak een nieuw product aan
        const newProduct = new Product({
            model,
            startPrice,
            size,
            colors: {
                sole: colors.sole,
                laces: colors.laces,
                outside_1: colors.outside_1,
                outside_2: colors.outside_2
            },
            materials: {
                sole: materials.sole,
                laces: materials.laces,
                outside_1: materials.outside_1,
                outside_2: materials.outside_2
            }
        });

        // Sla het product op in de database
        await newProduct.save();

        res.status(201).json({
            status: "Success",
            data: { product: newProduct }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAll,
    create
};
