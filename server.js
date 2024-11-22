const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const config = require('./config'); // Importeer de configuratie

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Configuratie via Config File
const uri = config.mongodb.uri;
const client = new MongoClient(uri);

// Database Connectie
let db;
client.connect()
  .then(() => {
    console.log("Verbonden met MongoDB");
    db = client.db("productsDB");
  })
  .catch(err => console.error("Fout bij verbinden met MongoDB:", err));

// POST Route voor Producten
app.post('/products', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Database is niet verbonden" });
    }

    const product = req.body;

    // Validatie van de ingevoerde data
    if (!product.name || !product.price) {
      return res.status(400).json({ error: "Product moet een naam en prijs hebben" });
    }

    const result = await db.collection('products').insertOne(product);
    res.status(201).json({ message: "Product toegevoegd", productId: result.insertedId });
  } catch (err) {
    console.error("Fout bij toevoegen product:", err);
    res.status(500).json({ error: "Interne serverfout" });
  }
});

// Start de Server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
