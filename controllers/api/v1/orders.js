let orders = []; 

const getAll = async (req, res) => {
    try {
        res.json({
            status: "Success",
            data: {
                orders: orders
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

const create = async (req, res) => {
    try {
        const { productId, customerId, orderDate, status, quantity, total } = req.body;
        const orderId = orders.length + 1;  

        const order = {
            orderId,
            productId,
            customerId,
            orderDate,
            status,
            quantity,
            total
        };

        orders.push(order);  

        res.json({
            status: "Success",
            data: {
                order: order
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

const getById = async (req, res) => {
    try {
        const order = orders.find(o => o.orderId === parseInt(req.params.orderId)); 
        if (!order) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        res.json({
            status: "Success",
            data: {
                order: order
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const orderIndex = orders.findIndex(o => o.orderId === parseInt(req.params.orderId));  
        if (orderIndex === -1) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        const updatedOrder = { ...orders[orderIndex], ...req.body }; 
        orders[orderIndex] = updatedOrder;  

        res.json({
            status: "Success",
            data: {
                order: updatedOrder
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

const deleteById = async (req, res) => {
    try {
        const orderIndex = orders.findIndex(o => o.orderId === parseInt(req.params.orderId));  
        if (orderIndex === -1) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found"
            });
        }

        const deletedOrder = orders.splice(orderIndex, 1); 

        res.json({
            status: "Success",
            data: {
                orderId: deletedOrder[0].orderId
            }
        });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
}
