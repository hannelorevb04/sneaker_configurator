let products = [];  // Deze array houdt de producten in het geheugen bij

// Haalt alle producten op
const getAll = async (req, res) => {
    try {
        
        res.json({
            status: "Success",
            data: {
                products: products
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}


const create = async (req, res) => {
    try {
        const { id, name, description, shoeSize, shoeColor, shoelaceColor, price, availability, quantity } = req.body;

        
        const newProduct = {
            id,
            name,
            description,
            shoeSize,
            shoeColor,
            shoelaceColor,
            price,
            availability,
            quantity
        };

        products.push(newProduct);

        res.json({
            status: "Success",
            data: {
                product: newProduct
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

module.exports = {
    getAll,
    create
}
