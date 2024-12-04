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

// Maak een nieuwe order
const createOrder = async (req, res) => {
    try {
      const { productId, clientDetails, totalPrice, status, orderDate } = req.body;
  
      // Validatie
      if (
        !productId ||
        !clientDetails ||
        !clientDetails.email ||
        !clientDetails.phone ||
        !clientDetails.address ||
        !clientDetails.address.street ||
        !clientDetails.address.city ||
        !clientDetails.address.zip ||
        !clientDetails.address.country ||
        !totalPrice
      ) {
        return res.status(400).json({
          status: "Error",
          message:
            "All fields in clientDetails (email, phone, address) and address (street, city, zip, country) are required.",
        });
      }
  
      // Maak een nieuwe order
      const newOrder = new Order({
        productId,
        clientDetails: {
          email: clientDetails.email,
          phone: clientDetails.phone,
          address: clientDetails.address,
        },
        status: status || "Pending",
        orderDate: orderDate || Date.now(),
        totalPrice,
      });
  
      // Sla de order op
      const savedOrder = await newOrder.save();
  
      res.status(201).json({
        status: "Success",
        data: { order: savedOrder },
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
      });
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
