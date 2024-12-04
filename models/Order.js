const mongoose = require('mongoose');

/*const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true }, // Naam van de klant
    quantity: { type: Number, required: true }, // Aantal items
    address: { type: String, required: true }, // Leveradres
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }, // Status van de bestelling
    total: { type: Number, required: true } // Totale prijs van de bestelling
});*/

const orderSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Verwijzing naar het Product-model
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
