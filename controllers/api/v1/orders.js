const Order = require('../../../models/Order'); // Importeer het Order model

// Haal alle orders op
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            status: "Success",
            data: { orders }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// Maak een nieuwe order aan
const createOrder = async (req, res) => {
    try {
        const { customerName, quantity, address, status, total } = req.body;

        // Validatie
        if (!customerName || !quantity || !address || !total) {
            return res.status(400).json({
                status: "Error",
                message: "customerName, quantity, address, and total are required fields."
            });
        }

        const newOrder = new Order({
            customerName,
            quantity,
            address,
            status: status || 'Pending',
            total
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            status: "Success",
            data: { order: savedOrder }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// Haal een specifieke order op
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        res.json({
            status: "Success",
            data: { order }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// Update een bestaande order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.orderId,
            req.body,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        res.json({
            status: "Success",
            data: { order: updatedOrder }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// Verwijder een specifieke order
const deleteOrderById = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

        if (!deletedOrder) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        res.json({
            status: "Success",
            data: { orderId: deletedOrder._id }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrderById
};
