const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");


const app = express();
const PORT = 5000;
connectDB();


// Middleware to accept JSON
app.use(express.json());

/* ================================
   MongoDB Connection
================================ */
mongoose.connect("mongodb://127.0.0.1:27017/lostfound", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});


/* ================================
   MongoDB Schema and Model
================================ */
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model("Item", itemSchema);


/* ================================
   Routes
================================ */

// Homepage test
app.get("/", (req, res) => {
    res.send("Lost and Found System Backend is Running");
});


// Test API
app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working successfully",
        status: "OK"
    });
});


/* ================================
   GET all items from MongoDB
================================ */
app.get("/api/items", async (req, res) => {

    try {

        const items = await Item.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching items",
            error: error.message
        });

    }

});


/* ================================
   POST add new item to MongoDB
================================ */
app.post("/api/items", async (req, res) => {

    try {

        const { name, description, location } = req.body;

        const newItem = new Item({
            name,
            description,
            location
        });

        const savedItem = await newItem.save();

        res.status(201).json({
            message: "Item added successfully",
            item: savedItem
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding item",
            error: error.message
        });

    }

});


/* ================================
   Report Lost Item API
================================ */
app.post("/api/lost-items", async (req, res) => {

    try {

        const { itemName, description, location } = req.body;

        const lostItem = new Item({
            name: itemName,
            description,
            location
        });

        const savedItem = await lostItem.save();

        res.status(201).json({
            message: "Lost item reported successfully",
            item: savedItem
        });

    } catch (error) {

        res.status(500).json({
            message: "Error reporting lost item",
            error: error.message
        });

    }

});


/* ================================
   Start Server
================================ */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

