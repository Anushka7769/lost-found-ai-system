const Item = require("../models/item");


// GET all items
exports.getItems = async (req, res) => {
    try {

        const items = await Item.find();

        res.json(items);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching items",
            error: error.message
        });

    }
};


// POST add new item
exports.addItem = async (req, res) => {
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
};

// GET single item by ID
exports.getItemById = async (req, res) => {

    try {

        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(item);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching item",
            error: error.message
        });

    }

};

// UPDATE item
exports.updateItem = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, description, location } = req.body;

        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, description, location },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json({
            message: "Item updated successfully",
            item: updatedItem
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating item",
            error: error.message
        });

    }

};


// DELETE item
exports.deleteItem = async (req, res) => {

    try {

        const { id } = req.params;

        const deletedItem = await Item.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json({
            message: "Item deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Error deleting item",
            error: error.message
        });

    }

};
