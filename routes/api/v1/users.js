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
            "text": "User created"
        }
    }
});
});

module.exports = router;