const express = require('express');
const router = express.Router();

/* api/v1/users */
router.get("/", (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "users": []
        }
    });
});

router.post("/", (req, res) => {
  res.json({ 
    "status": "Succes",
    "data": {
        "users": { 
            "id": req.body.id,
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "street": req.body.street,
            "number": req.body.number,
            "zipcode": req.body.zipcode,
            "city": req.body.city,
            "phone": req.body.phone,
            "role": req.body.role,
        }
    }
});
});

module.exports = router;