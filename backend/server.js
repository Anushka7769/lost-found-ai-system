const express = require("express");
const connectDB = require("./config/db");

const app = express();

const PORT = 5000;


// connect database
connectDB();


// middleware
app.use(express.json());


// import routes
const itemRoutes = require("./routes/itemRoutes");


// use routes
app.use("/api/items", itemRoutes);


// test route
app.get("/", (req, res) => {
    res.send("Lost and Found Backend Running");
});


// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
