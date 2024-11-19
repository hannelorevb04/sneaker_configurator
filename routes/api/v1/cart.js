const express = require('express');
const router = express.Router();
const cartController = require('../../../controllers/api/v1/cart');

/* api/v1/cart */
router.get("/", cartController.getAll);

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