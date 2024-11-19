const express = require('express');
const router = express.Router();

/* api/v1/cart */
router.get("/", (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "cart": []
        }
    });
});

router.post("/", (req, res) => {
  res.json({ 
    "status": "Succes",
    "data": {
        "cart": { 
            "productId": req.body.productId,
            "customerId": req.body.customerId, 
            "quantity": req.body.quantity,
            "total": req.body.total,
        }
    }
});
});

module.exports = router;