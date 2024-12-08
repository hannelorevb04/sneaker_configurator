const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

/*const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
    address: { type: String, required: true }, 
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }, 
    total: { type: Number, required: true } 
});*/

const orderSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  clientDetails: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Order', orderSchema, 'Orders');
