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
            "customerId": req.body.customerId,
            "productId": req.body.productId,
            "quantity": req.body.quantity,
            "price": req.body.price,
            "color": req.body.color,
            "size": req.body.size,
        }
    }
});
});

module.exports = router;