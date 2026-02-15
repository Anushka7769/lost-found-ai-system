const express = require("express");
const router = express.Router();

const itemController = require("../controllers/itemController");

// GET all items
router.get("/", itemController.getItems);

// GET single item
router.get("/:id", itemController.getItemById);

// POST item
router.post("/", itemController.addItem);

// UPDATE item
router.put("/:id", itemController.updateItem);

// DELETE item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
