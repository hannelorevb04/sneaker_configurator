const getAll = (req, res) => {
    res.json({
        "status": "Succes",
        "data": {
            "users": []
        }
    });
}

const create = (req, res) => {
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
}

const update = (req, res) => {
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
}

const passwordUpdate = (req, res) => {
    res.json({ 
    "status": "Succes",
    "data": {
        "users": { 
            "id": req.body.id,
            "password": req.body.password,
        }
    }
});
}



module.exports = {
    getAll,
    create,
    update,
}