const express = require('express');
const router = express.Router();

/* api/v1/orders */
router.get("/", (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "orders": []
        }
    });
});

router.post("/", (req, res) => {
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
});

module.exports = router;