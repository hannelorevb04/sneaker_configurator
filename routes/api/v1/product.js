const express = require('express');
const router = express.Router();

/* api/v1/product */
router.get("/", (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "product": []
        }
    });
});

router.post("/", (req, res) => {
  res.json({ 
    "status": "Succes",
    "data": {
        "product": { 
            "id": req.body.id,
            "name": req.body.name,
            "description": req.body.description,
            "shoeSize": req.body.shoeSize,
            "shoeColor": req.body.shoeColor,
            "shoelaceColor": req.body.shoelaceColor,
            "price": req.body.price,
            "availibility": req.body.availibility,
            "quantity": req.body.quantity,
        }
    }
});
});

module.exports = router;