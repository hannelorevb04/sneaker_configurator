const getAll = (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "cart": []
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


module.exports = {
    getAll,
    create,
}