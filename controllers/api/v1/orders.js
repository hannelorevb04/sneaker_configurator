const Order = require('../../../models/api/v1/Order');

const createOrder = (req, res) => {
    const order = new Order(req.body);
    order.save()
        .then(() => {
            res.json({
                "status": "Succes",
                "data": {
                    "order": order
                }
            });
        })
        .catch((err) => {
            res.json({
                "status": "Error",
                "message": err
            });
        });
}