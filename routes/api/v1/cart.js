const express = require('express');
const router = express.Router();
const ordersController = require('../../../controllers/api/v1/orders');

/* api/v1/cart */
router.get("/", ordersController.getAll);

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