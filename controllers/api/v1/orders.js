const getAll = (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "orders": []
        }
    });
}

const create = (req, res) => {
  res.json({ 
    "status": "Succes",
    "data": {
        "order": { 
            "orderId": req.params.orderId,
            "productId": req.body.productId,
            "customerId": req.body.customerId, 
            "orderDate": req.body.orderDate, 
            "status": req.body.status, 
            "quantity": req.body.quantity,
            "total": req.body.total,
            // "vote": req.body.vote,
        }
    }
});
}

const getById = (req, res) => {
    res.json({ 
    "status": "Succes",
    "data": {
        "order": { 
            "orderId": req.params.orderId,
            "productId": req.body.productId,
            "customerId": req.body.customerId, 
            "orderDate": req.body.orderDate, 
            "status": req.body.status, 
            "quantity": req.body.quantity,
            "total": req.body.total,
            // "vote": req.body.vote,
        }
    }
});
}
const update = (req, res) => {
    res.json({
        "status": req.body.status,
    })
}
const deleteById = (req, res) => {
    res.json({
        "orderId": req.body.orderId,
    })
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
}